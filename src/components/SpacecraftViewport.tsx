import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RotateCcw } from 'lucide-react';
import { CustomCraftConfig, ExploreMode, MotionEnvironment, SpacecraftData } from '../types/spacecraft';
import { BUILDER_SLOTS } from '../data/builderData';
import { createProceduralTextures, ProceduralTextureSet } from '../three/proceduralTextures';
import { buildCustomSpacecraftModel, buildSpacecraftModel, BuiltSpacecraft } from '../three/spacecraftBuilders';
import { buildMotionEnvironment, BuiltEnvironment } from '../three/environmentBuilders';

interface SpacecraftViewportProps {
  craft: SpacecraftData;
  customCraftConfig?: CustomCraftConfig | null;
  exploreMode: ExploreMode;
  explodeAmount: number;
  motionSpeed: number;
  selectedPartId: string | null;
  isActive: boolean;
  isInteractive: boolean;
  onSelectPart: (partId: string | null) => void;
  resetCameraSignal: number;
}

function getBuilderEnvironment(cfg: CustomCraftConfig): MotionEnvironment {
  if (cfg.propulsion === 'prop-rover-wheels') return 'mars-surface';
  if (cfg.power === 'power-shielded-fins') return 'solar-corona';
  if (cfg.core === 'core-crew-capsule') return 'reentry-splashdown';
  if (cfg.core === 'core-titanium-vault' || cfg.instrument === 'inst-ice-radar') return 'jupiter-orbit';
  return 'interstellar';
}

// Module-scope scratch math helpers (zero GC in render loop)
const _raycaster = new THREE.Raycaster();
const _mouse = new THREE.Vector2();
const _targetVec = new THREE.Vector3();
const _camGoal = new THREE.Vector3();
const _targetGoal = new THREE.Vector3();

function isSoftwareRenderer(gl: WebGLRenderingContext | WebGL2RenderingContext | null): boolean {
  if (!gl) return true;
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

export const SpacecraftViewport: React.FC<SpacecraftViewportProps> = ({
  craft,
  customCraftConfig = null,
  exploreMode,
  explodeAmount,
  motionSpeed,
  selectedPartId,
  isActive,
  isInteractive,
  onSelectPart,
  resetCameraSignal,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [contextError, setContextError] = useState(false);
  const [hoveredPartName, setHoveredPartName] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  // Latest props synced to refs for the stable WebGL loop
  const propsRef = useRef({
    craft,
    customCraftConfig,
    exploreMode,
    explodeAmount,
    motionSpeed,
    selectedPartId,
    isActive,
    isInteractive,
    onSelectPart,
  });
  propsRef.current = {
    craft,
    customCraftConfig,
    exploreMode,
    explodeAmount,
    motionSpeed,
    selectedPartId,
    isActive,
    isInteractive,
    onSelectPart,
  };

  // Internal scene controller ref so craft switching doesn't tear down renderer
  const sceneCtrlRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    textures: ProceduralTextureSet;
    activeCraft: BuiltSpacecraft | null;
    activeEnv: BuiltEnvironment | null;
    hoveredPartId: string | null;
    cameraAnimating: boolean;
    loadCraft: (newCraft: SpacecraftData, customCfg: CustomCraftConfig | null) => void;
    focusOnPart: (partId: string | null) => void;
    resumeLoop: () => void;
  } | null>(null);

  // Auto-recover if returning to 3D while a transient context error happened
  useEffect(() => {
    if (isActive && contextError) {
      setContextError(false);
      setRetryKey((k) => k + 1);
    }
  }, [isActive, contextError]);

  // 1. Mount WebGLRenderer once (or on manual/auto retry)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'default',
      });
    } catch {
      setContextError(true);
      return;
    }

    const rawGl = renderer.getContext();
    const isSoftwareGl = isSoftwareRenderer(rawGl);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1)
    );
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextError(true);
    };
    const handleContextRestored = () => {
      setContextError(false);
      setRetryKey((k) => k + 1);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b16);
    scene.fog = new THREE.FogExp2(0x070b16, 0.012);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      46,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      180
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.0;
    controls.maxDistance = 16.0;
    controls.enablePan = false;

    // 3-Point Studio / Space Lighting Rig (warm key + cool fill + rim)
    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.3);
    keyLight.position.set(6, 9, 7);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 28;
    const d = 6;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x8ec5ff, 0x1e293b, 0.9);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.15);
    rimLight.position.set(-7, 3, -6);
    scene.add(rimLight);

    const textures = createProceduralTextures(
      isSoftwareGl ? 1 : Math.min(renderer.capabilities.getMaxAnisotropy(), 8)
    );

    _raycaster.layers.set(1);

    let frameId = 0;
    let loopRunning = false;
    let disposed = false;
    const clock = new THREE.Clock();

    const ctrl = {
      scene,
      camera,
      controls,
      textures,
      activeCraft: null as BuiltSpacecraft | null,
      activeEnv: null as BuiltEnvironment | null,
      hoveredPartId: null as string | null,
      cameraAnimating: false,
      loadCraft: (newCraft: SpacecraftData, customCfg: CustomCraftConfig | null) => {
        if (ctrl.activeCraft) {
          scene.remove(ctrl.activeCraft.root);
          ctrl.activeCraft.dispose();
          ctrl.activeCraft = null;
        }
        if (ctrl.activeEnv) {
          scene.remove(ctrl.activeEnv.group);
          ctrl.activeEnv.dispose();
          ctrl.activeEnv = null;
        }
        ctrl.hoveredPartId = null;

        const builtCraft = customCfg
          ? buildCustomSpacecraftModel(customCfg, textures)
          : buildSpacecraftModel(newCraft, textures);
        const envType = customCfg ? getBuilderEnvironment(customCfg) : newCraft.motionEnvironment;
        const builtEnv = buildMotionEnvironment(envType, textures, scene);
        scene.add(builtEnv.group);
        scene.add(builtCraft.root);
        ctrl.activeCraft = builtCraft;
        ctrl.activeEnv = builtEnv;

        const [cx, cy, cz] = customCfg ? [3.8, 2.2, 4.6] : newCraft.defaultCameraPos;
        _camGoal.set(cx, cy, cz);
        _targetGoal.set(0, 0.25, 0);
        camera.position.set(cx, cy, cz);
        controls.target.set(0, 0.25, 0);
        controls.update();
        ctrl.cameraAnimating = false;
      },
      focusOnPart: (partId: string | null) => {
        const currentCraftData = propsRef.current.craft;
        const currentCustom = propsRef.current.customCraftConfig;
        if (currentCustom) {
          _camGoal.set(3.8, 2.2, 4.6);
          _targetGoal.set(0, 0.25, 0);
          ctrl.cameraAnimating = true;
          return;
        }
        if (!partId) {
          const [cx, cy, cz] = currentCraftData.defaultCameraPos;
          _camGoal.set(cx, cy, cz);
          _targetGoal.set(0, 0.25, 0);
          ctrl.cameraAnimating = true;
          return;
        }
        const partMeta = currentCraftData.parts.find((p) => p.id === partId);
        const partEntry = ctrl.activeCraft?.parts.find((p) => p.partId === partId);
        if (partMeta && partEntry) {
          const box = new THREE.Box3().setFromObject(partEntry.group);
          if (!box.isEmpty()) {
            box.getCenter(_targetGoal);
          } else {
            _targetGoal.set(0, 0.25, 0);
          }
          _camGoal.set(
            partMeta.cameraOffset[0],
            partMeta.cameraOffset[1],
            partMeta.cameraOffset[2]
          );
          ctrl.cameraAnimating = true;
        }
      },
      resumeLoop: () => {
        if (!disposed && !loopRunning && propsRef.current.isActive) {
          clock.getDelta(); // discard paused delta
          loopRunning = true;
          tick();
        }
      },
    };

    sceneCtrlRef.current = ctrl;
    ctrl.loadCraft(propsRef.current.craft, propsRef.current.customCraftConfig);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const onControlsStart = () => {
      ctrl.cameraAnimating = false;
    };
    controls.addEventListener('start', onControlsStart);

    let pointerDownX = 0;
    let pointerDownY = 0;
    let lastHoverCheck = 0;

    const updateMouseNDC = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _mouse.x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      _mouse.y = -((clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
    };

    const pickPart = (): string | null => {
      if (!ctrl.activeCraft) return null;
      _raycaster.setFromCamera(_mouse, camera);
      const intersects = _raycaster.intersectObject(ctrl.activeCraft.root, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (typeof hit.userData.partId === 'string') {
          return hit.userData.partId;
        }
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!propsRef.current.isInteractive || propsRef.current.exploreMode !== 'inspect') {
        if (ctrl.hoveredPartId !== null) {
          ctrl.hoveredPartId = null;
          setHoveredPartName(null);
          renderer.domElement.style.cursor = 'grab';
        }
        return;
      }
      const now = performance.now();
      if (now - lastHoverCheck < 45) return;
      lastHoverCheck = now;

      updateMouseNDC(e.clientX, e.clientY);
      const hitId = pickPart();
      if (hitId !== ctrl.hoveredPartId) {
        ctrl.hoveredPartId = hitId;
        if (hitId) {
          if (propsRef.current.customCraftConfig) {
            const slot = BUILDER_SLOTS.find((s) => s.id === hitId);
            setHoveredPartName(slot ? slot.label : null);
          } else {
            const meta = propsRef.current.craft.parts.find((p) => p.id === hitId);
            setHoveredPartName(meta ? meta.name : null);
          }
          renderer.domElement.style.cursor = 'pointer';
        } else {
          setHoveredPartName(null);
          renderer.domElement.style.cursor = 'grab';
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!propsRef.current.isInteractive || propsRef.current.exploreMode !== 'inspect') return;
      const dist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
      if (dist > 6) return;
      updateMouseNDC(e.clientX, e.clientY);
      const hitId = pickPart();
      propsRef.current.onSelectPart(hitId);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(handleResize)
        : null;
    resizeObserver?.observe(container);

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext | null;
      if (!gl || gl.isContextLost() || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed || gl.isContextLost()) {
          try {
            gl.deleteSync(sync);
          } catch {
            // ignore cleanup errors on lost context
          }
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;

      // Pause cleanly while non-3D sections cover the screen so browser doesn't starve WebGL
      if (!propsRef.current.isActive) {
        loopRunning = false;
        return;
      }

      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      const {
        exploreMode: mode,
        explodeAmount: explodeVal,
        motionSpeed: speedMult,
        selectedPartId: selId,
      } = propsRef.current;

      const isMotionMode = mode === 'motion';

      if (ctrl.activeCraft) {
        const effectiveExplode = isMotionMode ? 0 : explodeVal;
        for (const p of ctrl.activeCraft.parts) {
          _targetVec.copy(p.basePos).addScaledVector(p.explodeOffset, effectiveExplode);
          p.group.position.x = THREE.MathUtils.damp(p.group.position.x, _targetVec.x, 8, dt);
          p.group.position.y = THREE.MathUtils.damp(p.group.position.y, _targetVec.y, 8, dt);
          p.group.position.z = THREE.MathUtils.damp(p.group.position.z, _targetVec.z, 8, dt);

          const isSelected = !isMotionMode && selId === p.partId;
          const isHovered = !isMotionMode && ctrl.hoveredPartId === p.partId;
          for (const mesh of p.meshes) {
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              const baseHex = typeof mesh.userData.baseEmissive === 'number' ? mesh.userData.baseEmissive : 0x000000;
              const baseInt = typeof mesh.userData.baseEmissiveIntensity === 'number' ? mesh.userData.baseEmissiveIntensity : 0;
              if (isSelected) {
                mesh.material.emissive.setHex(0xf59e0b);
                mesh.material.emissiveIntensity = 0.55;
              } else if (isHovered) {
                mesh.material.emissive.setHex(0x38bdf8);
                mesh.material.emissiveIntensity = 0.35;
              } else {
                mesh.material.emissive.setHex(baseHex);
                mesh.material.emissiveIntensity = baseInt;
              }
            }
          }
        }
      }

      if (ctrl.activeEnv && ctrl.activeCraft) {
        ctrl.activeEnv.update(elapsed, dt, speedMult, ctrl.activeCraft, isMotionMode);
      }

      if (ctrl.cameraAnimating) {
        const k = 1 - Math.exp(-5.5 * dt);
        camera.position.lerp(_camGoal, k);
        controls.target.lerp(_targetGoal, k);
        if (
          camera.position.distanceTo(_camGoal) < 0.04 &&
          controls.target.distanceTo(_targetGoal) < 0.04
        ) {
          ctrl.cameraAnimating = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    };

    if (propsRef.current.isActive) {
      loopRunning = true;
      tick();
    }

    return () => {
      disposed = true;
      loopRunning = false;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
      controls.removeEventListener('start', onControlsStart);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      if (ctrl.activeCraft) ctrl.activeCraft.dispose();
      if (ctrl.activeEnv) ctrl.activeEnv.dispose();
      textures.dispose();
      envRT.dispose();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      sceneCtrlRef.current = null;
    };
  }, [retryKey]);

  // 2. Resume render loop immediately whenever the 3D view becomes active
  useEffect(() => {
    if (isActive) {
      sceneCtrlRef.current?.resumeLoop();
    }
  }, [isActive]);

  // 3. React to craft or builder configuration changes without destroying WebGL context
  useEffect(() => {
    sceneCtrlRef.current?.loadCraft(craft, customCraftConfig);
    setHoveredPartName(null);
  }, [craft, customCraftConfig]);

  // 4. React to part selection or camera reset
  useEffect(() => {
    if (exploreMode === 'inspect' && !customCraftConfig) {
      sceneCtrlRef.current?.focusOnPart(selectedPartId);
    }
  }, [selectedPartId, exploreMode, customCraftConfig]);

  useEffect(() => {
    if (resetCameraSignal > 0) {
      sceneCtrlRef.current?.focusOnPart(null);
    }
  }, [resetCameraSignal]);

  return (
    <div className="fixed inset-0 z-0 bg-[#070b16] select-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* Subtle floating cursor part tooltip in top-center below header when hovering a 3D part */}
      {isActive && isInteractive && exploreMode === 'inspect' && hoveredPartName && (
        <div className="pointer-events-none fixed top-16 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1.5 rounded-lg bg-[#0b1020]/92 border border-sky-400/35 text-xs font-medium text-sky-100 whitespace-nowrap">
          Click to inspect: {hoveredPartName}
        </div>
      )}

      {/* Graceful fallback with manual Resume button if WebGL fails */}
      {contextError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070b16] p-8 text-center">
          <p className="font-display text-2xl font-semibold text-amber-300 mb-2">
            3D Space Viewport Paused
          </p>
          <p className="text-sm text-slate-300 max-w-md mb-5">
            Your browser temporarily paused WebGL 3D graphics while idle or switching tabs. Click below to wake the 3D engine right back up!
          </p>
          <button
            type="button"
            onClick={() => {
              setContextError(false);
              setRetryKey((k) => k + 1);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-display text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Resume 3D View
          </button>
        </div>
      )}
    </div>
  );
};

