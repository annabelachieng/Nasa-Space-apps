import * as THREE from 'three';
import { MotionEnvironment } from '../types/spacecraft';
import { ProceduralTextureSet } from './proceduralTextures';
import { BuiltSpacecraft } from './spacecraftBuilders';

export interface BuiltEnvironment {
  group: THREE.Group;
  update: (elapsed: number, dt: number, speedMult: number, craft: BuiltSpacecraft, isMotionMode: boolean) => void;
  dispose: () => void;
}

// Helper: deterministic terrain height for Mars
export function marsTerrainHeightAt(x: number, z: number): number {
  return (
    Math.sin(x * 0.25) * 0.32 +
    Math.cos(z * 0.28) * 0.28 +
    Math.sin((x + z) * 0.55) * 0.12 -
    0.02 * (x * x + z * z) * 0.015
  );
}

// Custom RingGeometry radial UVs so 1D ring texture maps inner -> outer
function createRadialRingGeometry(innerR: number, outerR: number, segments = 72): THREE.RingGeometry {
  const geo = new THREE.RingGeometry(innerR, outerR, segments, 1);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const r = v.length();
    const u = (r - innerR) / (outerR - innerR);
    uv.setXY(i, u, 0.5);
  }
  return geo;
}

export function buildMotionEnvironment(
  envType: MotionEnvironment,
  textures: ProceduralTextureSet,
  scene: THREE.Scene
): BuiltEnvironment {
  const group = new THREE.Group();
  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geos.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    mats.push(m);
    return m;
  };

  // Shared Starfield using InstancedMesh (>20 repeated items)
  const starCount = 340;
  const starGeo = trackGeo(new THREE.OctahedronGeometry(0.08, 0));
  const starMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const starsInst = new THREE.InstancedMesh(starGeo, starMat, starCount);
  const dummy = new THREE.Object3D();
  const starColor = new THREE.Color();
  for (let i = 0; i < starCount; i++) {
    const theta = (i * 2.39996) % (Math.PI * 2);
    const phi = Math.acos(1 - (2 * (i + 0.5)) / starCount);
    const dist = 38 + (i % 7) * 4;
    dummy.position.set(
      dist * Math.sin(phi) * Math.cos(theta),
      dist * Math.cos(phi),
      dist * Math.sin(phi) * Math.sin(theta)
    );
    const s = 0.55 + ((i * 17) % 100) / 90;
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    starsInst.setMatrixAt(i, dummy.matrix);

    if (i % 5 === 0) starColor.setHex(0xbae6fd);
    else if (i % 7 === 0) starColor.setHex(0xfde68a);
    else starColor.setHex(0xf8fafc);
    starsInst.setColorAt(i, starColor);
  }
  starsInst.computeBoundingSphere();
  group.add(starsInst);

  // Environment-specific actors
  let planetMesh: THREE.Mesh | null = null;
  let ringMesh: THREE.Mesh | null = null;
  let auroraTop: THREE.Mesh | null = null;
  let marsGround: THREE.Mesh | null = null;
  let marsRocks: THREE.InstancedMesh | null = null;
  let contactShadowPlane: THREE.Mesh | null = null;
  let streamParticles: THREE.InstancedMesh | null = null;
  const streamCount = 60;
  const streamOffsets: { x: number; y: number; z: number; speed: number }[] = [];

  if (
    envType === 'mars-surface' ||
    envType === 'mars-polar' ||
    envType === 'mars-flight' ||
    envType === 'venus-surface' ||
    envType === 'comet-surface'
  ) {
    const isVenus = envType === 'venus-surface';
    const isComet = envType === 'comet-surface';
    const isPolar = envType === 'mars-polar';

    // Undulating planetary/comet terrain
    const terrainGeo = trackGeo(new THREE.PlaneGeometry(56, 56, 48, 48));
    terrainGeo.rotateX(-Math.PI / 2);
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let h = marsTerrainHeightAt(x, z);
      if (isComet) {
        // Dramatic jagged cliff wall in the background casting deep shadow over Philae
        const cliffDist = Math.max(0, -z - 3.5);
        h += cliffDist * 0.48 + Math.sin(x * 0.45) * 0.35;
      }
      pos.setY(i, h);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: isVenus
          ? textures.venusSurface
          : isComet
            ? textures.cometSurface
            : isPolar
              ? textures.marsPolarSurface
              : textures.marsSurface,
        color: isVenus
          ? 0xd47a2c
          : isComet
            ? 0x4b5563
            : isPolar
              ? 0xc49a89
              : 0xd9754d,
        roughness: isComet ? 0.94 : 0.9,
        metalness: 0.04,
      })
    );
    marsGround = new THREE.Mesh(terrainGeo, terrainMat);
    marsGround.receiveShadow = true;
    marsGround.position.y = -0.05;
    group.add(marsGround);

    // Scattered rocks / basalt slabs / comet boulders via InstancedMesh
    const rockCount = 44;
    const rockGeo = trackGeo(new THREE.DodecahedronGeometry(0.32, 0));
    const rockMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: isVenus ? 0x5c2c12 : isComet ? 0x262b36 : isPolar ? 0x7c5c52 : 0x8f432b,
        roughness: 0.88,
        metalness: 0.06,
      })
    );
    marsRocks = new THREE.InstancedMesh(rockGeo, rockMat, rockCount);
    marsRocks.castShadow = true;
    marsRocks.receiveShadow = true;
    const rockColor = new THREE.Color();
    for (let i = 0; i < rockCount; i++) {
      const a = (i / rockCount) * Math.PI * 2 + (i % 3) * 0.4;
      const dist = 3.8 + ((i * 7) % 18);
      const rx = Math.cos(a) * dist;
      const rz = Math.sin(a) * dist;
      const ry = marsTerrainHeightAt(rx, rz);
      dummy.position.set(rx, ry + 0.04, rz);
      dummy.rotation.set(i * 0.5, i * 1.1, i * 0.3);
      const s = 0.85 + ((i * 19) % 30) / 100; // +-15% variation
      dummy.scale.set(
        s * (isComet ? 1.45 : 1.2),
        s * (isComet ? 1.1 : 0.72),
        s
      );
      dummy.updateMatrix();
      marsRocks.setMatrixAt(i, dummy.matrix);

      if (isComet) {
        rockColor.setHSL(0.6, 0.1, 0.14 + (i % 5) * 0.04);
      } else if (isVenus) {
        rockColor.setHSL(0.06 + (i % 3) * 0.015, 0.55, 0.18 + (i % 4) * 0.04);
      } else if (isPolar) {
        rockColor.setHSL(0.05, 0.22, 0.36 + (i % 4) * 0.06);
      } else {
        rockColor.setHSL(0.04 + (i % 4) * 0.01, 0.52, 0.3 + (i % 5) * 0.04);
      }
      marsRocks.setColorAt(i, rockColor);
    }
    marsRocks.computeBoundingSphere();
    group.add(marsRocks);

    // Soft radial contact shadow under rover/lander/helicopter
    const shadGeo = trackGeo(new THREE.PlaneGeometry(3.4, 3.4));
    shadGeo.rotateX(-Math.PI / 2);
    const shadMat = trackMat(
      new THREE.MeshBasicMaterial({
        map: textures.contactShadow,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
      })
    );
    contactShadowPlane = new THREE.Mesh(shadGeo, shadMat);
    contactShadowPlane.position.y = 0.02;
    group.add(contactShadowPlane);
  } else if (envType === 'earth-orbit' || envType === 'reentry-splashdown') {
    const earthGeo = trackGeo(new THREE.SphereGeometry(9.5, 48, 36));
    const earthMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.earthSurface,
        roughness: 0.72,
        metalness: 0.05,
      })
    );
    planetMesh = new THREE.Mesh(earthGeo, earthMat);
    planetMesh.position.set(0, -11.8, -4.5);
    planetMesh.receiveShadow = true;
    group.add(planetMesh);

    // Atmospheric rim halo
    const atmoGeo = trackGeo(new THREE.SphereGeometry(9.78, 40, 32));
    const atmoMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: envType === 'reentry-splashdown' ? 0xfb923c : 0x38bdf8,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    planetMesh.add(atmo);
  } else if (envType === 'saturn-orbit') {
    const satGeo = trackGeo(new THREE.SphereGeometry(6.8, 48, 36));
    const satMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.saturnSurface,
        roughness: 0.78,
        metalness: 0.02,
      })
    );
    planetMesh = new THREE.Mesh(satGeo, satMat);
    planetMesh.position.set(-5.8, -5.0, -9.5);
    planetMesh.rotation.z = 0.35;
    group.add(planetMesh);

    const ringGeo = trackGeo(createRadialRingGeometry(8.2, 14.8, 72));
    const ringMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.saturnRings,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.65,
        depthWrite: false,
      })
    );
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2 - 0.18;
    planetMesh.add(ringMesh);
  } else if (envType === 'jupiter-orbit') {
    const jupGeo = trackGeo(new THREE.SphereGeometry(7.6, 48, 36));
    const jupMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.jupiterSurface,
        roughness: 0.75,
        metalness: 0.03,
      })
    );
    planetMesh = new THREE.Mesh(jupGeo, jupMat);
    planetMesh.position.set(-5.6, -5.2, -9.5);
    group.add(planetMesh);

    // Polar blue aurora glow crown
    const aurGeo = trackGeo(new THREE.TorusGeometry(2.6, 0.28, 12, 36));
    const aurMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    auroraTop = new THREE.Mesh(aurGeo, aurMat);
    auroraTop.position.y = 7.2;
    auroraTop.rotation.x = Math.PI / 2;
    planetMesh.add(auroraTop);
  } else if (envType === 'solar-corona') {
    const sunGeo = trackGeo(new THREE.SphereGeometry(6.2, 40, 32));
    const sunMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xffb347,
      })
    );
    planetMesh = new THREE.Mesh(sunGeo, sunMat);
    planetMesh.position.set(0, -1.5, 11.5);
    group.add(planetMesh);

    const glowGeo = trackGeo(new THREE.SphereGeometry(7.2, 32, 24));
    const glowMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.28,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    planetMesh.add(new THREE.Mesh(glowGeo, glowMat));
  } else if (envType === 'mercury-orbit') {
    const mercGeo = trackGeo(new THREE.SphereGeometry(7.8, 48, 36));
    const mercMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.mercurySurface,
        roughness: 0.88,
        metalness: 0.05,
      })
    );
    planetMesh = new THREE.Mesh(mercGeo, mercMat);
    planetMesh.position.set(-4.5, -6.8, -8.0);
    group.add(planetMesh);
  } else if (envType === 'lunar-orbit') {
    const moonGeo = trackGeo(new THREE.SphereGeometry(8.4, 48, 36));
    const moonMat = trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.mercurySurface,
        color: 0xd8dce4,
        roughness: 0.92,
        metalness: 0.02,
      })
    );
    planetMesh = new THREE.Mesh(moonGeo, moonMat);
    planetMesh.position.set(0, -10.8, -4.5);
    planetMesh.receiveShadow = true;
    group.add(planetMesh);
  } else if (envType === 'solar-orbit') {
    const distantSunGeo = trackGeo(new THREE.SphereGeometry(2.8, 32, 24));
    const distantSunMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xfde047,
      })
    );
    planetMesh = new THREE.Mesh(distantSunGeo, distantSunMat);
    planetMesh.position.set(-8.5, 3.6, -16.5);
    group.add(planetMesh);

    const sunHaloGeo = trackGeo(new THREE.SphereGeometry(3.7, 28, 20));
    const sunHaloMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    planetMesh.add(new THREE.Mesh(sunHaloGeo, sunHaloMat));
  }

  // Streaming cosmic/atmospheric particles for deep space, Venus haze, comet outgassing, or reentry
  if (
    envType === 'interstellar' ||
    envType === 'solar-corona' ||
    envType === 'solar-orbit' ||
    envType === 'reentry-splashdown' ||
    envType === 'venus-surface' ||
    envType === 'comet-surface'
  ) {
    const pGeo = trackGeo(new THREE.SphereGeometry(0.045, 6, 6));
    const pMat = trackMat(
      new THREE.MeshBasicMaterial({
        color:
          envType === 'solar-corona'
            ? 0xfde047
            : envType === 'solar-orbit'
              ? 0xc4b5fd
              : envType === 'venus-surface'
                ? 0xf59e0b
                : envType === 'comet-surface'
                  ? 0xe2e8f0
                  : envType === 'reentry-splashdown'
                    ? 0xfb923c
                    : 0x7dd3fc,
        transparent: true,
        opacity:
          envType === 'solar-orbit'
            ? 0.45
            : envType === 'venus-surface'
              ? 0.5
              : 0.65,
      })
    );
    streamParticles = new THREE.InstancedMesh(pGeo, pMat, streamCount);
    for (let i = 0; i < streamCount; i++) {
      streamOffsets.push({
        x: ((i * 73) % 140) / 10 - 7,
        y: ((i * 37) % 100) / 10 - 5,
        z: ((i * 53) % 240) / 10 - 12,
        speed:
          envType === 'venus-surface' || envType === 'comet-surface'
            ? 1.4 + (i % 4) * 0.5
            : 4 + (i % 5) * 1.4,
      });
    }
    streamParticles.frustumCulled = false;
    group.add(streamParticles);
  }

  // Scratch vectors to prevent GC in loop
  const _matDummy = new THREE.Object3D();

  const update = (
    elapsed: number,
    dt: number,
    speedMult: number,
    craft: BuiltSpacecraft,
    isMotionMode: boolean
  ) => {
    const t = elapsed * speedMult;

    // Show planetary terrain / planets only in Motion mode (keep starfield in Inspect mode)
    if (planetMesh) planetMesh.visible = isMotionMode;
    if (marsGround) marsGround.visible = isMotionMode;
    if (marsRocks) marsRocks.visible = isMotionMode;
    if (contactShadowPlane) {
      contactShadowPlane.visible = isMotionMode;
    }
    if (streamParticles) streamParticles.visible = isMotionMode;

    // Match fog to mode & environment
    if (isMotionMode && (envType === 'mars-surface' || envType === 'mars-flight')) {
      scene.background = new THREE.Color(0x2a140d);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(0x2a140d);
        scene.fog.density = 0.032;
      }
    } else if (isMotionMode && envType === 'venus-surface') {
      scene.background = new THREE.Color(0x452208);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(0x452208);
        scene.fog.density = 0.045;
      }
    } else if (isMotionMode && envType === 'mars-polar') {
      scene.background = new THREE.Color(0x1b1e29);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(0x1b1e29);
        scene.fog.density = 0.028;
      }
    } else {
      scene.background = new THREE.Color(0x070b16);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(0x070b16);
        scene.fog.density = 0.012;
      }
    }

    // Slow celestial star drift
    starsInst.rotation.y = elapsed * 0.008;

    // Spin craft sub-parts (Ingenuity blades, Galileo spun bus)
    craft.spinParts.forEach((sp) => {
      const rate = isMotionMode ? sp.speed * speedMult : sp.speed * 0.15;
      sp.obj.rotation[sp.axis] += rate * dt;
    });

    // Beacon rings (Sputnik 1)
    craft.beaconRings.forEach((ring, idx) => {
      ring.visible = isMotionMode;
      if (isMotionMode) {
        const phase = (t * 0.9 + idx * 0.5) % 1;
        const scale = 0.8 + phase * 2.2;
        ring.scale.setScalar(scale);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = (1 - phase) * 0.55;
      }
    });

    // Re-entry plasma cone
    if (craft.plasmaShell) {
      const mat = craft.plasmaShell.material as THREE.MeshBasicMaterial;
      if (isMotionMode && envType === 'reentry-splashdown') {
        craft.plasmaShell.visible = true;
        mat.opacity = 0.38 + Math.sin(t * 14) * 0.12;
      } else {
        craft.plasmaShell.visible = false;
      }
    }

    if (!isMotionMode) {
      // Gentle studio float when inspecting
      craft.root.position.set(0, Math.sin(elapsed * 1.1) * 0.06, 0);
      craft.root.rotation.set(0, 0, 0);
      return;
    }

    // Motion Mode choreography per environment
    if (planetMesh) {
      planetMesh.rotation.y += 0.08 * dt * speedMult;
    }

    if (envType === 'mars-surface') {
      if (craft.wheels.length > 0) {
        // Rover drives a gentle circular patrol over Martian terrain
        const radius = 2.6;
        const angle = t * 0.28;
        const rx = Math.cos(angle) * radius;
        const rz = Math.sin(angle) * radius;
        const groundY = marsTerrainHeightAt(rx, rz);

        craft.root.position.set(rx, groundY - 0.04, rz);
        craft.root.rotation.set(
          Math.sin(angle * 2) * 0.05,
          -angle,
          Math.cos(angle * 2) * 0.04
        );
        craft.wheels.forEach((w) => {
          w.rotation.x += 1.6 * dt * speedMult;
        });
        if (contactShadowPlane) {
          contactShadowPlane.position.set(rx, groundY + 0.02, rz);
        }
      } else {
        // Stationary lander (InSight) holds its ground firmly in Elysium Planitia
        const groundY = marsTerrainHeightAt(0, 0);
        craft.root.position.set(0, groundY + 0.72, 0);
        craft.root.rotation.set(0, Math.sin(t * 0.15) * 0.04, 0);
        if (contactShadowPlane) {
          contactShadowPlane.position.set(0, groundY + 0.02, 0);
        }
      }
    } else if (
      envType === 'venus-surface' ||
      envType === 'comet-surface' ||
      envType === 'mars-polar'
    ) {
      // Rearguard stationary landers stand firm on harsh planetary/comet surfaces
      const groundY = marsTerrainHeightAt(0, 0);
      const liftY = envType === 'venus-surface' ? 0.85 : envType === 'comet-surface' ? 0.86 : 0.74;
      craft.root.position.set(0, groundY + liftY, 0);
      craft.root.rotation.set(0, envType === 'comet-surface' ? 0.35 : 0, 0);
      if (contactShadowPlane) {
        contactShadowPlane.position.set(0, groundY + 0.02, 0);
      }
    } else if (envType === 'mars-flight') {
      // Ingenuity hovers and sweeps in a figure-8 over Martian dunes
      const fx = Math.sin(t * 0.55) * 2.4;
      const fz = Math.sin(t * 1.1) * 1.2;
      const groundY = marsTerrainHeightAt(fx, fz);
      const hoverH = 1.45 + Math.sin(t * 2.1) * 0.22;

      craft.root.position.set(fx, groundY + hoverH, fz);
      craft.root.rotation.set(
        Math.cos(t * 1.1) * 0.08,
        t * 0.3,
        -Math.cos(t * 0.55) * 0.1
      );
      if (contactShadowPlane) {
        contactShadowPlane.position.set(fx, groundY + 0.02, fz);
        const s = 0.7 + (2.0 - hoverH) * 0.2;
        contactShadowPlane.scale.setScalar(Math.max(0.5, s));
      }
    } else if (envType === 'earth-orbit' || envType === 'lunar-orbit') {
      craft.root.position.set(Math.sin(t * 0.55) * 0.85, 0.35 + Math.sin(t * 1.1) * 0.22, 0);
      craft.root.rotation.set(0.12, t * 0.35, Math.sin(t * 0.65) * 0.14);
    } else if (envType === 'reentry-splashdown') {
      // Slight aerodynamic buffeting while diving behind heat shield
      craft.root.position.set(Math.sin(t * 7) * 0.04, Math.cos(t * 5.5) * 0.05, 0);
      craft.root.rotation.set(0.28 + Math.sin(t * 3) * 0.03, t * 0.35, Math.cos(t * 4) * 0.03);
    } else if (envType === 'saturn-orbit' || envType === 'jupiter-orbit' || envType === 'mercury-orbit') {
      // Sweeping orbital arc past giant/inner world
      craft.root.position.set(
        Math.sin(t * 0.55) * 1.2,
        Math.cos(t * 0.7) * 0.45 + 0.3,
        Math.cos(t * 0.55) * 0.6
      );
      craft.root.rotation.set(0.18, t * 0.35, Math.sin(t * 0.6) * 0.12);
    } else if (envType === 'solar-corona') {
      craft.root.position.set(Math.sin(t * 0.8) * 0.6, Math.cos(t * 1.1) * 0.3, 0);
      craft.root.rotation.set(0, Math.sin(t * 0.4) * 0.08, 0);
    } else if (envType === 'solar-orbit') {
      // Slow silent ghost-stage drift along heliocentric orbit
      craft.root.position.set(Math.sin(t * 0.4) * 0.5, Math.sin(t * 0.75) * 0.22, 0);
      craft.root.rotation.set(0.18 + Math.sin(t * 0.3) * 0.08, t * 0.22, t * 0.14);
    } else if (envType === 'interstellar') {
      craft.root.position.set(0, Math.sin(t * 0.9) * 0.16, 0);
      craft.root.rotation.set(0.08, Math.sin(t * 0.35) * 0.16, Math.cos(t * 0.4) * 0.06);
    }

    // Update streaming particle streaks
    if (streamParticles) {
      for (let i = 0; i < streamCount; i++) {
        const p = streamOffsets[i];
        p.z -= p.speed * dt * speedMult;
        if (p.z < -14) p.z = 12;
        _matDummy.position.set(p.x, p.y, p.z);
        _matDummy.scale.set(0.8, 0.8, 3.6);
        _matDummy.updateMatrix();
        streamParticles.setMatrixAt(i, _matDummy.matrix);
      }
      streamParticles.instanceMatrix.needsUpdate = true;
    }
  };

  return {
    group,
    update,
    dispose: () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
    },
  };
}
