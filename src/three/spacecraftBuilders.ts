import * as THREE from 'three';
import { CustomCraftConfig, SpacecraftData } from '../types/spacecraft';
import { ProceduralTextureSet } from './proceduralTextures';

export interface BuiltPartEntry {
  partId: string;
  group: THREE.Group;
  basePos: THREE.Vector3;
  explodeOffset: THREE.Vector3;
  meshes: THREE.Mesh[];
}

export interface BuiltSpacecraft {
  root: THREE.Group;
  parts: BuiltPartEntry[];
  spinParts: { obj: THREE.Object3D; axis: 'x' | 'y' | 'z'; speed: number }[];
  wheels: THREE.Object3D[];
  beaconRings: THREE.Mesh[];
  plasmaShell?: THREE.Mesh;
  dispose: () => void;
}

// Helper to create parabolic dish using LatheGeometry
function createDishGeometry(radius: number, depth: number, segments = 32): THREE.LatheGeometry {
  const pts: THREE.Vector2[] = [];
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = t * radius;
    const y = t * t * depth;
    pts.push(new THREE.Vector2(r, y));
  }
  // Slight rim lip
  pts.push(new THREE.Vector2(radius * 1.02, depth * 1.04));
  pts.push(new THREE.Vector2(radius * 0.99, depth * 0.94));
  const geo = new THREE.LatheGeometry(pts, segments);
  geo.computeVertexNormals();
  return geo;
}

// Helper to create beveled regular polygon prism via ExtrudeGeometry
function createBeveledPolygonGeometry(sides: number, radius: number, height: number, bevel = 0.04): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / sides;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

export function buildSpacecraftModel(
  craft: SpacecraftData,
  textures: ProceduralTextureSet
): BuiltSpacecraft {
  const root = new THREE.Group();
  const parts: BuiltPartEntry[] = [];
  const spinParts: { obj: THREE.Object3D; axis: 'x' | 'y' | 'z'; speed: number }[] = [];
  const wheels: THREE.Object3D[] = [];
  const beaconRings: THREE.Mesh[] = [];
  let plasmaShell: THREE.Mesh | undefined;

  const geometriesToDispose: THREE.BufferGeometry[] = [];
  const materialsToDispose: THREE.Material[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometriesToDispose.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    materialsToDispose.push(m);
    return m;
  };

  // Materials factory (cloned per part so hover/selection emissive highlights stay isolated)
  const makeMaterials = () => ({
    polishedAlum: trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xe6ecf5,
        metalness: 0.92,
        roughness: 0.14,
        clearcoat: 0.3,
        bumpMap: textures.metalBrushedBump,
        bumpScale: 0.008,
      })
    ),
    brushedTitanium: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x9aa4b2,
        metalness: 0.85,
        roughness: 0.36,
        bumpMap: textures.metalBrushedBump,
        bumpScale: 0.012,
      })
    ),
    whiteDish: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 0.08,
        roughness: 0.45,
        side: THREE.DoubleSide,
      })
    ),
    goldFoil: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xf4c552,
        map: textures.goldFoilColor,
        bumpMap: textures.goldFoilBump,
        bumpScale: 0.035,
        metalness: 0.88,
        roughness: 0.28,
      })
    ),
    solar: trackMat(
      new THREE.MeshPhysicalMaterial({
        map: textures.solarPanel,
        metalness: 0.25,
        roughness: 0.22,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
      })
    ),
    darkCarbon: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x262b36,
        metalness: 0.25,
        roughness: 0.68,
      })
    ),
    copperAccent: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xd97736,
        metalness: 0.86,
        roughness: 0.26,
      })
    ),
    heatShieldMat: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x573b2c,
        map: textures.heatShield,
        metalness: 0.1,
        roughness: 0.82,
      })
    ),
    goldenRecordMat: trackMat(
      new THREE.MeshStandardMaterial({
        map: textures.goldenRecord,
        metalness: 0.9,
        roughness: 0.2,
      })
    ),
    lensCyan: trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        metalness: 0.1,
        roughness: 0.1,
        emissive: new THREE.Color(0x0284c7),
        emissiveIntensity: 0.35,
      })
    ),
    warmOrange: trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xf97316,
        metalness: 0.15,
        roughness: 0.5,
      })
    ),
  });

  // Helper to register a part group matching SpacecraftData.parts
  const createPartGroup = (partId: string): THREE.Group => {
    const partMeta = craft.parts.find((p) => p.id === partId);
    const group = new THREE.Group();
    group.name = partId;
    const offset = partMeta ? partMeta.explodeOffset : [0, 0, 0];
    root.add(group);
    parts.push({
      partId,
      group,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeOffset: new THREE.Vector3(offset[0], offset[1], offset[2]),
      meshes: [],
    });
    return group;
  };

  const addMeshToPart = (
    partId: string,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    pos: [number, number, number] = [0, 0, 0],
    rot: [number, number, number] = [0, 0, 0]
  ): THREE.Mesh => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.layers.enable(1);
    mesh.userData.partId = partId;
    mesh.userData.baseEmissive =
      material instanceof THREE.MeshStandardMaterial
        ? material.emissive.getHex()
        : 0x000000;
    mesh.userData.baseEmissiveIntensity =
      material instanceof THREE.MeshStandardMaterial ? material.emissiveIntensity : 0;

    const entry = parts.find((p) => p.partId === partId);
    if (entry) {
      entry.group.add(mesh);
      entry.meshes.push(mesh);
    }
    return mesh;
  };

  // =========================================================================
  // BUILDERS BY SPACECRAFT ID
  // =========================================================================
  switch (craft.id) {
    // -----------------------------------------------------------------------
    // 1A. SPUTNIK 1
    // -----------------------------------------------------------------------
    case 'sputnik-1': {
      // Sphere Shell
      const mShell = makeMaterials();
      createPartGroup('sphere-shell');
      addMeshToPart('sphere-shell', trackGeo(new THREE.SphereGeometry(0.9, 36, 28)), mShell.polishedAlum);
      addMeshToPart(
        'sphere-shell',
        trackGeo(new THREE.TorusGeometry(0.905, 0.032, 12, 48)),
        mShell.brushedTitanium,
        [0, 0, 0],
        [Math.PI / 2, 0, 0]
      );

      // 4 Whip Antennas (TubeGeometry swept backward)
      const mAnt = makeMaterials();
      createPartGroup('whip-antennas');
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const len = i % 2 === 0 ? 2.5 : 2.9;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(angle) * 0.72, 0.45, Math.sin(angle) * 0.72),
          new THREE.Vector3(Math.cos(angle) * (0.72 + len * 0.55), -0.45, Math.sin(angle) * (0.72 + len * 0.55)),
          new THREE.Vector3(Math.cos(angle) * (0.72 + len * 0.95), -1.35, Math.sin(angle) * (0.72 + len * 0.95)),
        ]);
        addMeshToPart(
          'whip-antennas',
          trackGeo(new THREE.TubeGeometry(curve, 16, 0.024, 8, false)),
          mAnt.polishedAlum
        );
        // Antenna mount collar
        addMeshToPart(
          'whip-antennas',
          trackGeo(new THREE.CylinderGeometry(0.06, 0.08, 0.14, 12)),
          mAnt.copperAccent,
          [Math.cos(angle) * 0.74, 0.46, Math.sin(angle) * 0.74],
          [0, -angle, -Math.PI / 3]
        );
      }

      // Radio Core (visible especially in exploded view)
      const mCore = makeMaterials();
      createPartGroup('radio-core');
      addMeshToPart('radio-core', trackGeo(new THREE.CylinderGeometry(0.36, 0.36, 0.42, 16)), mCore.copperAccent, [0, 0.15, 0]);
      addMeshToPart('radio-core', trackGeo(new THREE.BoxGeometry(0.45, 0.18, 0.25)), mCore.goldFoil, [0, 0.42, 0]);
      // Vacuum tube bulb accent
      addMeshToPart('radio-core', trackGeo(new THREE.CylinderGeometry(0.07, 0.07, 0.22, 12)), mCore.lensCyan, [0.16, 0.46, 0]);

      // Pressurized Nitrogen Chamber lower assembly
      const mNitro = makeMaterials();
      createPartGroup('nitrogen-seal');
      addMeshToPart('nitrogen-seal', trackGeo(new THREE.CylinderGeometry(0.44, 0.34, 0.32, 20)), mNitro.brushedTitanium, [0, -0.35, 0]);
      addMeshToPart('nitrogen-seal', trackGeo(new THREE.TorusGeometry(0.38, 0.035, 10, 24)), mNitro.warmOrange, [0, -0.2, 0], [Math.PI / 2, 0, 0]);

      // Subtle radio beacon waves for motion mode
      for (let i = 0; i < 2; i++) {
        const ringGeo = trackGeo(new THREE.RingGeometry(1.15 + i * 0.4, 1.2 + i * 0.4, 36));
        const ringMat = trackMat(
          new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        root.add(ring);
        beaconRings.push(ring);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // 1B. EXPLORER 1
    // -----------------------------------------------------------------------
    case 'explorer-1': {
      const mBody = makeMaterials();
      createPartGroup('cylindrical-body');
      addMeshToPart('cylindrical-body', trackGeo(new THREE.CylinderGeometry(0.26, 0.26, 2.2, 24)), mBody.polishedAlum, [0, 0, 0], [0, 0, Math.PI / 2]);
      // White painted thermal stripes
      for (let i = -2; i <= 2; i += 2) {
        addMeshToPart('cylindrical-body', trackGeo(new THREE.CylinderGeometry(0.266, 0.266, 0.26, 24)), mBody.whiteDish, [i * 0.28, 0, 0], [0, 0, Math.PI / 2]);
      }
      // Nose cone
      addMeshToPart('cylindrical-body', trackGeo(new THREE.ConeGeometry(0.26, 0.55, 24)), mBody.whiteDish, [1.37, 0, 0], [0, 0, -Math.PI / 2]);

      const mGeiger = makeMaterials();
      createPartGroup('geiger-tube');
      addMeshToPart('geiger-tube', trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 0.55, 16)), mGeiger.copperAccent, [0.78, 0, 0], [0, 0, Math.PI / 2]);
      addMeshToPart('geiger-tube', trackGeo(new THREE.SphereGeometry(0.15, 16, 12)), mGeiger.lensCyan, [1.05, 0, 0]);

      const mMicro = makeMaterials();
      createPartGroup('micrometeorite-ring');
      addMeshToPart('micrometeorite-ring', trackGeo(new THREE.TorusGeometry(0.275, 0.03, 10, 28)), mMicro.goldFoil, [-0.3, 0, 0], [0, Math.PI / 2, 0]);
      addMeshToPart('micrometeorite-ring', trackGeo(new THREE.CylinderGeometry(0.272, 0.272, 0.22, 24)), mMicro.darkCarbon, [-0.3, 0, 0], [0, 0, Math.PI / 2]);

      const mAnt = makeMaterials();
      createPartGroup('turnstile-antennas');
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        addMeshToPart(
          'turnstile-antennas',
          trackGeo(new THREE.CylinderGeometry(0.015, 0.015, 0.95, 8)),
          mAnt.polishedAlum,
          [-0.95, Math.cos(a) * 0.55, Math.sin(a) * 0.55],
          [a, 0, 0]
        );
      }
      addMeshToPart('turnstile-antennas', trackGeo(new THREE.ConeGeometry(0.18, 0.35, 16)), mAnt.darkCarbon, [-1.25, 0, 0], [0, 0, Math.PI / 2]);
      break;
    }

    // -----------------------------------------------------------------------
    // 2A. VOYAGER 1 & 2
    // -----------------------------------------------------------------------
    case 'voyager': {
      // High-gain parabolic dish
      const mDish = makeMaterials();
      createPartGroup('high-gain-dish');
      addMeshToPart('high-gain-dish', trackGeo(createDishGeometry(1.55, 0.42, 36)), mDish.whiteDish, [0, 0.42, 0]);
      // Tripod feed struts + subreflector
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const strutCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(a) * 1.15, 0.65, Math.sin(a) * 1.15),
          new THREE.Vector3(0, 1.55, 0),
        ]);
        addMeshToPart('high-gain-dish', trackGeo(new THREE.TubeGeometry(strutCurve, 8, 0.025, 8, false)), mDish.brushedTitanium);
      }
      addMeshToPart('high-gain-dish', trackGeo(new THREE.CylinderGeometry(0.22, 0.14, 0.16, 18)), mDish.whiteDish, [0, 1.55, 0]);

      // Decagonal Main Bus + Golden Record
      const mGold = makeMaterials();
      createPartGroup('golden-record');
      addMeshToPart('golden-record', trackGeo(createBeveledPolygonGeometry(10, 0.72, 0.42, 0.03)), mGold.darkCarbon, [0, 0.12, 0], [Math.PI / 2, 0, 0]);
      addMeshToPart('golden-record', trackGeo(new THREE.CylinderGeometry(0.26, 0.26, 0.06, 28)), mGold.goldenRecordMat, [0.74, 0.14, 0.12], [0, 0, Math.PI / 2]);

      // RTG Boom
      const mRtg = makeMaterials();
      createPartGroup('rtg-boom');
      addMeshToPart('rtg-boom', trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 1.85, 10)), mRtg.brushedTitanium, [-1.45, -0.05, 0.2], [0, 0, Math.PI / 2]);
      for (let i = 0; i < 3; i++) {
        addMeshToPart('rtg-boom', trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 0.34, 14)), mRtg.darkCarbon, [-1.55 - i * 0.38, -0.05, 0.2], [0, 0, Math.PI / 2]);
      }

      // Science Scan Platform
      const mScan = makeMaterials();
      createPartGroup('scan-platform');
      addMeshToPart('scan-platform', trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 1.65, 10)), mScan.brushedTitanium, [1.35, 0.05, -0.35], [0, 0.4, Math.PI / 2]);
      addMeshToPart('scan-platform', trackGeo(new THREE.BoxGeometry(0.38, 0.28, 0.34)), mScan.goldFoil, [2.15, 0.12, -0.7]);
      addMeshToPart('scan-platform', trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 0.22, 12)), mScan.lensCyan, [2.36, 0.16, -0.7], [0, 0, Math.PI / 2]);

      // 13m Magnetometer Boom (scaled visually for composition)
      const mMag = makeMaterials();
      createPartGroup('magnetometer-boom');
      addMeshToPart('magnetometer-boom', trackGeo(new THREE.CylinderGeometry(0.03, 0.045, 3.2, 8)), mMag.goldFoil, [0, -0.02, -2.0], [Math.PI / 2, 0, 0]);
      addMeshToPart('magnetometer-boom', trackGeo(new THREE.OctahedronGeometry(0.12, 0)), mMag.copperAccent, [0, -0.02, -3.65]);
      break;
    }

    // -----------------------------------------------------------------------
    // 2B. PARKER SOLAR PROBE
    // -----------------------------------------------------------------------
    case 'parker-solar-probe': {
      const mShield = makeMaterials();
      createPartGroup('heat-shield');
      addMeshToPart('heat-shield', trackGeo(createBeveledPolygonGeometry(6, 1.35, 0.16, 0.04)), mShield.whiteDish, [0, 0, 0.95]);
      addMeshToPart('heat-shield', trackGeo(createBeveledPolygonGeometry(6, 1.28, 0.12, 0.02)), mShield.darkCarbon, [0, 0, 0.84]);

      const mBus = makeMaterials();
      createPartGroup('main-bus');
      addMeshToPart('main-bus', trackGeo(createBeveledPolygonGeometry(6, 0.62, 1.25, 0.03)), mBus.goldFoil, [0, 0, 0.05]);
      addMeshToPart('main-bus', trackGeo(new THREE.CylinderGeometry(0.28, 0.34, 0.45, 16)), mBus.brushedTitanium, [0, 0, -0.72], [Math.PI / 2, 0, 0]);

      const mArrays = makeMaterials();
      createPartGroup('cooling-arrays');
      [-1, 1].forEach((side) => {
        addMeshToPart('cooling-arrays', trackGeo(new THREE.BoxGeometry(0.95, 0.38, 0.05)), mArrays.solar, [side * 0.95, 0, -0.15], [0.25, side * -0.45, 0]);
        addMeshToPart('cooling-arrays', trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8)), mArrays.copperAccent, [side * 0.55, 0, -0.1], [0, 0, Math.PI / 2]);
      });

      const mCup = makeMaterials();
      createPartGroup('faraday-cup');
      addMeshToPart('faraday-cup', trackGeo(new THREE.CylinderGeometry(0.14, 0.18, 0.28, 16)), mCup.brushedTitanium, [0.88, 0.85, 0.92], [Math.PI / 2, 0, 0]);
      addMeshToPart('faraday-cup', trackGeo(new THREE.TorusGeometry(0.14, 0.025, 8, 18)), mCup.lensCyan, [0.88, 0.85, 1.04]);
      break;
    }

    // -----------------------------------------------------------------------
    // 3A. OPPORTUNITY (MER-B)
    // -----------------------------------------------------------------------
    case 'opportunity': {
      // Warm Electronics Box
      const mBox = makeMaterials();
      createPartGroup('warm-box');
      addMeshToPart('warm-box', trackGeo(createBeveledPolygonGeometry(6, 0.58, 0.46, 0.04)), mBox.goldFoil, [0, 0.42, 0], [Math.PI / 2, 0, 0]);

      // Gold-tinted Solar Wings
      const mWings = makeMaterials();
      createPartGroup('solar-wings');
      addMeshToPart('solar-wings', trackGeo(new THREE.BoxGeometry(1.05, 0.06, 1.15)), mWings.solar, [0, 0.68, -0.05]);
      addMeshToPart('solar-wings', trackGeo(new THREE.BoxGeometry(0.75, 0.05, 0.9)), mWings.solar, [-0.88, 0.68, 0.08], [0, 0.15, -0.08]);
      addMeshToPart('solar-wings', trackGeo(new THREE.BoxGeometry(0.75, 0.05, 0.9)), mWings.solar, [0.88, 0.68, 0.08], [0, -0.15, 0.08]);
      // High gain dish on rear deck
      addMeshToPart('solar-wings', trackGeo(createDishGeometry(0.28, 0.09, 20)), mWings.whiteDish, [-0.25, 0.78, -0.45], [-0.35, 0, 0]);

      // Pancam Mast & Stereo Eyes
      const mMast = makeMaterials();
      createPartGroup('pancam-mast');
      addMeshToPart('pancam-mast', trackGeo(new THREE.CylinderGeometry(0.05, 0.06, 0.85, 12)), mMast.whiteDish, [0.18, 1.1, 0.35]);
      addMeshToPart('pancam-mast', trackGeo(new THREE.BoxGeometry(0.42, 0.16, 0.22)), mMast.whiteDish, [0.18, 1.54, 0.38]);
      addMeshToPart('pancam-mast', trackGeo(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12)), mMast.lensCyan, [0.06, 1.54, 0.5], [Math.PI / 2, 0, 0]);
      addMeshToPart('pancam-mast', trackGeo(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12)), mMast.lensCyan, [0.3, 1.54, 0.5], [Math.PI / 2, 0, 0]);

      // 6 Rocker-Bogie Wheels
      const mWheels = makeMaterials();
      const wheelGroup = createPartGroup('rocker-bogie-wheels');
      const wheelPositions: [number, number, number][] = [
        [-0.78, 0.0, 0.68],
        [-0.82, 0.0, 0.0],
        [-0.78, 0.0, -0.68],
        [0.78, 0.0, 0.68],
        [0.82, 0.0, 0.0],
        [0.78, 0.0, -0.68],
      ];
      wheelPositions.forEach(([wx, wy, wz]) => {
        const w = addMeshToPart(
          'rocker-bogie-wheels',
          trackGeo(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 16)),
          mWheels.darkCarbon,
          [wx, wy + 0.22, wz],
          [0, 0, Math.PI / 2]
        );
        // Inner aluminum hub
        const hub = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.11, 0.11, 0.18, 12)), mWheels.polishedAlum);
        w.add(hub);
        wheels.push(w);
        // Suspension strut connecting to body
        addMeshToPart(
          'rocker-bogie-wheels',
          trackGeo(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8)),
          mWheels.brushedTitanium,
          [wx * 0.72, 0.35, wz * 0.72],
          [0, 0, wx < 0 ? -0.55 : 0.55]
        );
      });
      wheelGroup.position.y = 0;

      // Robotic Arm
      const mArm = makeMaterials();
      createPartGroup('robotic-arm');
      const armCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.42, 0.55),
        new THREE.Vector3(0.2, 0.48, 0.95),
        new THREE.Vector3(-0.05, 0.32, 1.25),
      ]);
      addMeshToPart('robotic-arm', trackGeo(new THREE.TubeGeometry(armCurve, 14, 0.035, 8, false)), mArm.brushedTitanium);
      addMeshToPart('robotic-arm', trackGeo(new THREE.CylinderGeometry(0.12, 0.12, 0.16, 12)), mArm.copperAccent, [-0.05, 0.32, 1.32], [Math.PI / 2, 0, 0]);
      break;
    }

    // -----------------------------------------------------------------------
    // 3B. INGENUITY MARS HELICOPTER
    // -----------------------------------------------------------------------
    case 'ingenuity': {
      const mCube = makeMaterials();
      createPartGroup('fuselage-cube');
      addMeshToPart('fuselage-cube', trackGeo(new THREE.BoxGeometry(0.44, 0.42, 0.44)), mCube.goldFoil, [0, 0.65, 0]);
      addMeshToPart('fuselage-cube', trackGeo(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12)), mCube.lensCyan, [0, 0.43, 0.1]);

      const mRotors = makeMaterials();
      const rotorGroup = createPartGroup('rotor-blades');
      addMeshToPart('rotor-blades', trackGeo(new THREE.CylinderGeometry(0.04, 0.05, 0.55, 12)), mRotors.brushedTitanium, [0, 1.1, 0]);
      const bladeUpper = addMeshToPart('rotor-blades', trackGeo(new THREE.BoxGeometry(2.3, 0.025, 0.14)), mRotors.darkCarbon, [0, 1.32, 0]);
      const bladeLower = addMeshToPart('rotor-blades', trackGeo(new THREE.BoxGeometry(2.3, 0.025, 0.14)), mRotors.darkCarbon, [0, 1.15, 0], [0, Math.PI / 2, 0]);
      spinParts.push({ obj: bladeUpper, axis: 'y', speed: 18 });
      spinParts.push({ obj: bladeLower, axis: 'y', speed: -18 });

      const mSolar = makeMaterials();
      createPartGroup('top-solar');
      addMeshToPart('top-solar', trackGeo(new THREE.BoxGeometry(0.75, 0.04, 0.32)), mSolar.solar, [0, 1.46, 0]);

      const mLegs = makeMaterials();
      createPartGroup('landing-legs');
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(a) * 0.22, 0.52, Math.sin(a) * 0.22),
          new THREE.Vector3(Math.cos(a) * 0.65, 0.04, Math.sin(a) * 0.65),
        ]);
        addMeshToPart('landing-legs', trackGeo(new THREE.TubeGeometry(legCurve, 8, 0.024, 8, false)), mLegs.darkCarbon);
        addMeshToPart('landing-legs', trackGeo(new THREE.SphereGeometry(0.04, 10, 8)), mLegs.copperAccent, [Math.cos(a) * 0.65, 0.04, Math.sin(a) * 0.65]);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // 4A. CASSINI
    // -----------------------------------------------------------------------
    case 'cassini': {
      const mDish = makeMaterials();
      createPartGroup('cassini-dish');
      addMeshToPart('cassini-dish', trackGeo(createDishGeometry(1.15, 0.35, 32)), mDish.whiteDish, [0, 0.9, 0]);
      addMeshToPart('cassini-dish', trackGeo(new THREE.CylinderGeometry(0.12, 0.12, 0.55, 12)), mDish.brushedTitanium, [0, 1.25, 0]);

      const mBus = makeMaterials();
      createPartGroup('gold-bus');
      addMeshToPart('gold-bus', trackGeo(createBeveledPolygonGeometry(12, 0.56, 1.15, 0.04)), mBus.goldFoil, [0, 0.22, 0], [Math.PI / 2, 0, 0]);
      addMeshToPart('gold-bus', trackGeo(new THREE.ConeGeometry(0.22, 0.36, 16)), mBus.darkCarbon, [-0.15, -0.52, 0], [Math.PI, 0, 0]);
      addMeshToPart('gold-bus', trackGeo(new THREE.ConeGeometry(0.22, 0.36, 16)), mBus.darkCarbon, [0.15, -0.52, 0], [Math.PI, 0, 0]);

      const mHuy = makeMaterials();
      createPartGroup('huygens-probe');
      addMeshToPart('huygens-probe', trackGeo(new THREE.ConeGeometry(0.62, 0.35, 24)), mHuy.copperAccent, [0.76, 0.25, 0], [0, 0, -Math.PI / 2]);
      addMeshToPart('huygens-probe', trackGeo(new THREE.CylinderGeometry(0.62, 0.56, 0.12, 24)), mHuy.goldFoil, [0.62, 0.25, 0], [0, 0, Math.PI / 2]);

      const mMag = makeMaterials();
      createPartGroup('mag-boom');
      addMeshToPart('mag-boom', trackGeo(new THREE.CylinderGeometry(0.03, 0.04, 2.5, 8)), mMag.brushedTitanium, [-1.55, 0.35, 0], [0, 0, Math.PI / 2]);
      addMeshToPart('mag-boom', trackGeo(new THREE.SphereGeometry(0.1, 12, 10)), mMag.copperAccent, [-2.82, 0.35, 0]);

      const mOpt = makeMaterials();
      createPartGroup('optical-palette');
      addMeshToPart('optical-palette', trackGeo(new THREE.BoxGeometry(0.48, 0.36, 0.42)), mOpt.brushedTitanium, [-0.62, 0.05, 0.48]);
      addMeshToPart('optical-palette', trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 0.18, 12)), mOpt.lensCyan, [-0.68, 0.08, 0.72], [Math.PI / 2, 0, 0]);
      break;
    }

    // -----------------------------------------------------------------------
    // 4B. GALILEO
    // -----------------------------------------------------------------------
    case 'galileo': {
      const mDish = makeMaterials();
      createPartGroup('umbrella-dish');
      addMeshToPart('umbrella-dish', trackGeo(createDishGeometry(1.2, 0.42, 18)), mDish.goldFoil, [0, 0.85, 0]);
      addMeshToPart('umbrella-dish', trackGeo(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 12)), mDish.whiteDish, [0, 1.32, 0]);

      const mSpun = makeMaterials();
      const spunGroup = createPartGroup('spun-section');
      addMeshToPart('spun-section', trackGeo(createBeveledPolygonGeometry(8, 0.52, 0.72, 0.03)), mSpun.darkCarbon, [0, 0.32, 0], [Math.PI / 2, 0, 0]);
      // RTG booms on spun side
      addMeshToPart('spun-section', trackGeo(new THREE.CylinderGeometry(0.04, 0.04, 1.9, 10)), mSpun.brushedTitanium, [0, 0.32, 0], [0, 0, Math.PI / 2]);
      spinParts.push({ obj: spunGroup, axis: 'y', speed: 0.7 });

      const mDespun = makeMaterials();
      createPartGroup('despun-platform');
      addMeshToPart('despun-platform', trackGeo(new THREE.BoxGeometry(0.48, 0.38, 0.42)), mDespun.goldFoil, [0, -0.35, 0]);
      addMeshToPart('despun-platform', trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 12)), mDespun.lensCyan, [0, -0.35, 0.28], [Math.PI / 2, 0, 0]);

      const mProbe = makeMaterials();
      createPartGroup('entry-probe');
      addMeshToPart('entry-probe', trackGeo(new THREE.ConeGeometry(0.45, 0.38, 22)), mProbe.heatShieldMat, [0.4, -0.78, 0], [Math.PI, 0, 0]);
      addMeshToPart('entry-probe', trackGeo(new THREE.SphereGeometry(0.32, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2)), mProbe.whiteDish, [0.4, -0.58, 0]);
      break;
    }

    // -----------------------------------------------------------------------
    // 5A. JUNO
    // -----------------------------------------------------------------------
    case 'juno': {
      const mVault = makeMaterials();
      createPartGroup('titanium-vault');
      addMeshToPart('titanium-vault', trackGeo(createBeveledPolygonGeometry(6, 0.65, 0.68, 0.04)), mVault.brushedTitanium, [0, 0, 0], [Math.PI / 2, 0, 0]);
      addMeshToPart('titanium-vault', trackGeo(new THREE.BoxGeometry(0.46, 0.42, 0.46)), mVault.goldFoil, [0, 0.2, 0]);

      const mDish = makeMaterials();
      createPartGroup('juno-dish');
      addMeshToPart('juno-dish', trackGeo(createDishGeometry(0.76, 0.22, 28)), mDish.whiteDish, [0, 0.44, 0]);
      addMeshToPart('juno-dish', trackGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 10)), mDish.polishedAlum, [0, 0.68, 0]);

      // 3 Giant Windmill Solar Wings
      const mWings = makeMaterials();
      createPartGroup('three-solar-wings');
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const wingLen = 2.65;
        const cx = Math.cos(a) * (0.68 + wingLen * 0.5);
        const cz = Math.sin(a) * (0.68 + wingLen * 0.5);
        addMeshToPart(
          'three-solar-wings',
          trackGeo(new THREE.BoxGeometry(wingLen, 0.06, 0.72)),
          mWings.solar,
          [cx, 0.0, cz],
          [0, -a, 0]
        );
        // Hinge strut
        addMeshToPart(
          'three-solar-wings',
          trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 8)),
          mWings.brushedTitanium,
          [Math.cos(a) * 0.66, 0, Math.sin(a) * 0.66],
          [0, -a, Math.PI / 2]
        );
      }

      const mSensors = makeMaterials();
      createPartGroup('junocam-sensors');
      addMeshToPart('junocam-sensors', trackGeo(new THREE.BoxGeometry(0.32, 0.24, 0.28)), mSensors.darkCarbon, [0, -0.45, 0.32]);
      addMeshToPart('junocam-sensors', trackGeo(new THREE.CylinderGeometry(0.06, 0.06, 0.14, 12)), mSensors.lensCyan, [0, -0.45, 0.48], [Math.PI / 2, 0, 0]);
      break;
    }

    // -----------------------------------------------------------------------
    // 5B. NEW HORIZONS
    // -----------------------------------------------------------------------
    case 'new-horizons': {
      const mBody = makeMaterials();
      createPartGroup('gold-triangle');
      addMeshToPart('gold-triangle', trackGeo(createBeveledPolygonGeometry(3, 0.85, 0.44, 0.04)), mBody.goldFoil, [0, 0, 0], [Math.PI / 2, 0, 0]);

      const mDish = makeMaterials();
      createPartGroup('nh-dish');
      addMeshToPart('nh-dish', trackGeo(createDishGeometry(0.95, 0.26, 28)), mDish.whiteDish, [0, 0.28, 0]);
      addMeshToPart('nh-dish', trackGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 10)), mDish.brushedTitanium, [0, 0.52, 0]);

      const mLorri = makeMaterials();
      createPartGroup('lorri-camera');
      addMeshToPart('lorri-camera', trackGeo(new THREE.CylinderGeometry(0.14, 0.16, 0.48, 16)), mLorri.polishedAlum, [0.55, 0.05, 0.35], [Math.PI / 2, 0, -0.4]);
      addMeshToPart('lorri-camera', trackGeo(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 16)), mLorri.lensCyan, [0.64, 0.05, 0.56], [Math.PI / 2, 0, -0.4]);

      const mRtg = makeMaterials();
      createPartGroup('nh-rtg');
      addMeshToPart('nh-rtg', trackGeo(new THREE.CylinderGeometry(0.15, 0.15, 0.82, 14)), mRtg.darkCarbon, [-0.85, -0.04, -0.52], [0.5, 0, Math.PI / 3]);
      break;
    }

    // -----------------------------------------------------------------------
    // 6A. APOLLO 11 COMMAND MODULE "COLUMBIA"
    // -----------------------------------------------------------------------
    case 'apollo-11-cm': {
      const mCabin = makeMaterials();
      createPartGroup('crew-cabin');
      // Truncated cone hull
      addMeshToPart('crew-cabin', trackGeo(new THREE.CylinderGeometry(0.42, 1.25, 1.35, 36)), mCabin.polishedAlum, [0, 0.1, 0]);

      const mShield = makeMaterials();
      createPartGroup('heat-shield-base');
      addMeshToPart('heat-shield-base', trackGeo(createDishGeometry(1.28, -0.32, 36)), mShield.heatShieldMat, [0, -0.56, 0]);
      addMeshToPart('heat-shield-base', trackGeo(new THREE.TorusGeometry(1.25, 0.045, 10, 36)), mShield.copperAccent, [0, -0.56, 0], [Math.PI / 2, 0, 0]);

      const mHatch = makeMaterials();
      createPartGroup('hatch-windows');
      addMeshToPart('hatch-windows', trackGeo(new THREE.BoxGeometry(0.48, 0.56, 0.14)), mHatch.brushedTitanium, [0, 0.08, 0.86], [-0.52, 0, 0]);
      addMeshToPart('hatch-windows', trackGeo(new THREE.BoxGeometry(0.18, 0.14, 0.08)), mHatch.lensCyan, [-0.42, 0.25, 0.72], [-0.45, -0.45, 0]);
      addMeshToPart('hatch-windows', trackGeo(new THREE.BoxGeometry(0.18, 0.14, 0.08)), mHatch.lensCyan, [0.42, 0.25, 0.72], [-0.45, 0.45, 0]);

      const mTunnel = makeMaterials();
      createPartGroup('docking-tunnel');
      addMeshToPart('docking-tunnel', trackGeo(new THREE.CylinderGeometry(0.32, 0.42, 0.42, 24)), mTunnel.whiteDish, [0, 0.96, 0]);
      addMeshToPart('docking-tunnel', trackGeo(new THREE.CylinderGeometry(0.06, 0.1, 0.35, 12)), mTunnel.copperAccent, [0, 1.25, 0]);

      // Glowing re-entry plasma shell (only visible in motion mode)
      const plasmaGeo = trackGeo(createDishGeometry(1.48, -0.48, 32));
      const plasmaMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: 0xff6b2b,
          transparent: true,
          opacity: 0.0,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      plasmaShell = new THREE.Mesh(plasmaGeo, plasmaMat);
      plasmaShell.position.y = -0.62;
      root.add(plasmaShell);
      break;
    }

    // -----------------------------------------------------------------------
    // 6B. OSIRIS-REX SAMPLE CAPSULE
    // -----------------------------------------------------------------------
    case 'osiris-rex-capsule': {
      const mShield = makeMaterials();
      createPartGroup('pica-shield');
      addMeshToPart('pica-shield', trackGeo(new THREE.ConeGeometry(1.18, 0.52, 32)), mShield.heatShieldMat, [0, -0.22, 0], [Math.PI, 0, 0]);

      const mLid = makeMaterials();
      createPartGroup('backshell-lid');
      addMeshToPart('backshell-lid', trackGeo(new THREE.ConeGeometry(1.14, 0.46, 32)), mLid.whiteDish, [0, 0.26, 0]);

      const mCanister = makeMaterials();
      createPartGroup('sample-canister');
      addMeshToPart('sample-canister', trackGeo(new THREE.CylinderGeometry(0.45, 0.45, 0.22, 24)), mCanister.polishedAlum, [0, 0.05, 0]);
      addMeshToPart('sample-canister', trackGeo(new THREE.TorusGeometry(0.38, 0.04, 10, 24)), mCanister.goldFoil, [0, 0.14, 0], [Math.PI / 2, 0, 0]);

      const mChute = makeMaterials();
      createPartGroup('chute-pack');
      addMeshToPart('chute-pack', trackGeo(new THREE.CylinderGeometry(0.28, 0.34, 0.22, 20)), mChute.warmOrange, [0, 0.52, 0]);

      const plasmaGeo = trackGeo(new THREE.ConeGeometry(1.36, 0.66, 32));
      const plasmaMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: 0xf97316,
          transparent: true,
          opacity: 0.0,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      plasmaShell = new THREE.Mesh(plasmaGeo, plasmaMat);
      plasmaShell.rotation.x = Math.PI;
      plasmaShell.position.y = -0.26;
      root.add(plasmaShell);
      break;
    }

    // -----------------------------------------------------------------------
    // 1C. VANGUARD 1
    // -----------------------------------------------------------------------
    case 'vanguard-1': {
      const mHull = makeMaterials();
      createPartGroup('grapefruit-hull');
      addMeshToPart('grapefruit-hull', trackGeo(new THREE.SphereGeometry(0.75, 32, 24)), mHull.polishedAlum);
      addMeshToPart('grapefruit-hull', trackGeo(new THREE.TorusGeometry(0.76, 0.028, 10, 36)), mHull.brushedTitanium, [0, 0, 0], [Math.PI / 2, 0, 0]);

      const mSolar = makeMaterials();
      createPartGroup('solar-windows');
      const winPositions: [number, number, number, number, number][] = [
        [0, 0.72, 0, -Math.PI / 2, 0],
        [0, -0.72, 0, Math.PI / 2, 0],
        [0.72, 0, 0, 0, Math.PI / 2],
        [-0.72, 0, 0, 0, -Math.PI / 2],
        [0, 0, 0.72, 0, 0],
        [0, 0, -0.72, 0, Math.PI],
      ];
      winPositions.forEach(([x, y, z, rx, ry]) => {
        addMeshToPart('solar-windows', trackGeo(new THREE.BoxGeometry(0.32, 0.32, 0.08)), mSolar.solar, [x, y, z], [rx, ry, 0]);
      });

      const mAnt = makeMaterials();
      createPartGroup('six-rod-antennas');
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const tilt = i % 2 === 0 ? 0.45 : -0.45;
        addMeshToPart(
          'six-rod-antennas',
          trackGeo(new THREE.CylinderGeometry(0.015, 0.02, 1.35, 8)),
          mAnt.polishedAlum,
          [Math.cos(a) * 1.1, tilt, Math.sin(a) * 1.1],
          [tilt, 0, -Math.cos(a) * 0.8]
        );
      }
      break;
    }

    // -----------------------------------------------------------------------
    // 2C. PIONEER 10
    // -----------------------------------------------------------------------
    case 'pioneer-10': {
      const mDish = makeMaterials();
      createPartGroup('pioneer-dish');
      addMeshToPart('pioneer-dish', trackGeo(createDishGeometry(1.35, 0.34, 34)), mDish.whiteDish, [0, 0.45, 0]);
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const c = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(a) * 1.0, 0.65, Math.sin(a) * 1.0),
          new THREE.Vector3(0, 1.45, 0),
        ]);
        addMeshToPart('pioneer-dish', trackGeo(new THREE.TubeGeometry(c, 8, 0.022, 8, false)), mDish.brushedTitanium);
      }

      const mPlaque = makeMaterials();
      createPartGroup('pioneer-plaque');
      addMeshToPart('pioneer-plaque', trackGeo(createBeveledPolygonGeometry(6, 0.62, 0.42, 0.03)), mPlaque.goldFoil, [0, 0.14, 0], [Math.PI / 2, 0, 0]);
      addMeshToPart('pioneer-plaque', trackGeo(new THREE.BoxGeometry(0.32, 0.24, 0.05)), mPlaque.goldenRecordMat, [0.58, 0.22, 0.2], [0, 0.4, 0]);

      const mRtg = makeMaterials();
      createPartGroup('pioneer-rtgs');
      [-1, 1].forEach((side) => {
        addMeshToPart('pioneer-rtgs', trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 1.9, 8)), mRtg.brushedTitanium, [side * 1.25, 0.05, -0.35], [0, side * 0.4, Math.PI / 2]);
        addMeshToPart('pioneer-rtgs', trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 0.42, 14)), mRtg.darkCarbon, [side * 2.15, 0.05, -0.58], [0, 0, Math.PI / 2]);
      });
      break;
    }

    // -----------------------------------------------------------------------
    // 3C. SOJOURNER ROVER
    // -----------------------------------------------------------------------
    case 'sojourner': {
      const mDeck = makeMaterials();
      createPartGroup('sojourner-solar-deck');
      addMeshToPart('sojourner-solar-deck', trackGeo(new THREE.BoxGeometry(1.15, 0.06, 1.45)), mDeck.solar, [0, 0.68, 0]);
      addMeshToPart('sojourner-solar-deck', trackGeo(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8)), mDeck.polishedAlum, [-0.4, 0.98, -0.5]);

      const mBody = makeMaterials();
      createPartGroup('sojourner-body');
      addMeshToPart('sojourner-body', trackGeo(new THREE.BoxGeometry(0.82, 0.34, 1.05)), mBody.goldFoil, [0, 0.46, 0]);
      addMeshToPart('sojourner-body', trackGeo(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 12)), mBody.lensCyan, [-0.15, 0.5, 0.56], [Math.PI / 2, 0, 0]);
      addMeshToPart('sojourner-body', trackGeo(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 12)), mBody.lensCyan, [0.15, 0.5, 0.56], [Math.PI / 2, 0, 0]);

      const mWheels = makeMaterials();
      createPartGroup('sojourner-wheels');
      const swPos: [number, number, number][] = [
        [-0.6, 0, 0.52], [-0.62, 0, 0], [-0.6, 0, -0.52],
        [0.6, 0, 0.52], [0.62, 0, 0], [0.6, 0, -0.52],
      ];
      swPos.forEach(([wx, wy, wz]) => {
        const w = addMeshToPart('sojourner-wheels', trackGeo(new THREE.CylinderGeometry(0.18, 0.18, 0.14, 16)), mWheels.polishedAlum, [wx, wy + 0.18, wz], [0, 0, Math.PI / 2]);
        wheels.push(w);
        addMeshToPart('sojourner-wheels', trackGeo(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 8)), mWheels.brushedTitanium, [wx * 0.72, 0.32, wz * 0.75], [0, 0, wx < 0 ? -0.5 : 0.5]);
      });

      const mApxs = makeMaterials();
      createPartGroup('apxs-sniffer');
      addMeshToPart('apxs-sniffer', trackGeo(new THREE.CylinderGeometry(0.12, 0.14, 0.28, 14)), mApxs.copperAccent, [0, 0.38, -0.68], [Math.PI / 2, 0, 0]);
      break;
    }

    // -----------------------------------------------------------------------
    // 4C. EUROPA CLIPPER
    // -----------------------------------------------------------------------
    case 'europa-clipper': {
      const mVault = makeMaterials();
      createPartGroup('clipper-vault');
      addMeshToPart('clipper-vault', trackGeo(new THREE.CylinderGeometry(0.55, 0.6, 1.35, 16)), mVault.brushedTitanium, [0, 0, 0]);
      addMeshToPart('clipper-vault', trackGeo(createDishGeometry(0.95, 0.28, 28)), mVault.whiteDish, [0, 0.72, 0]);

      const mWings = makeMaterials();
      createPartGroup('clipper-wings');
      [-1, 1].forEach((side) => {
        addMeshToPart('clipper-wings', trackGeo(new THREE.BoxGeometry(2.6, 0.05, 0.95)), mWings.solar, [side * 1.95, 0.1, 0]);
        addMeshToPart('clipper-wings', trackGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 8)), mWings.brushedTitanium, [side * 0.65, 0.1, 0], [0, 0, Math.PI / 2]);
      });

      const mRadar = makeMaterials();
      createPartGroup('ice-radar-booms');
      addMeshToPart('ice-radar-booms', trackGeo(new THREE.CylinderGeometry(0.025, 0.025, 3.1, 8)), mRadar.copperAccent, [0, -0.45, 0], [Math.PI / 2, 0, 0]);
      addMeshToPart('ice-radar-booms', trackGeo(new THREE.CylinderGeometry(0.025, 0.025, 2.4, 8)), mRadar.lensCyan, [0, -0.45, 0], [0, 0, Math.PI / 2]);
      break;
    }

    // -----------------------------------------------------------------------
    // 5C. MESSENGER
    // -----------------------------------------------------------------------
    case 'messenger': {
      const mShade = makeMaterials();
      createPartGroup('ceramic-sunshade');
      addMeshToPart('ceramic-sunshade', trackGeo(new THREE.CylinderGeometry(1.15, 1.15, 1.55, 24, 1, true, -Math.PI / 3, (Math.PI * 2) / 3)), mShade.whiteDish, [0, 0.08, 0.42]);

      const mWings = makeMaterials();
      createPartGroup('mercury-solar-wings');
      [-1, 1].forEach((side) => {
        addMeshToPart('mercury-solar-wings', trackGeo(new THREE.BoxGeometry(1.5, 0.05, 0.72)), mWings.solar, [side * 1.45, 0, -0.2], [0.4, 0, 0]);
        addMeshToPart('mercury-solar-wings', trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8)), mWings.brushedTitanium, [side * 0.68, 0, -0.2], [0, 0, Math.PI / 2]);
      });

      const mImg = makeMaterials();
      createPartGroup('mercury-imagers');
      addMeshToPart('mercury-imagers', trackGeo(createBeveledPolygonGeometry(6, 0.56, 0.95, 0.03)), mImg.darkCarbon, [0, 0, -0.15]);
      addMeshToPart('mercury-imagers', trackGeo(new THREE.CylinderGeometry(0.11, 0.11, 0.22, 14)), mImg.lensCyan, [0, -0.58, -0.2]);
      break;
    }

    // -----------------------------------------------------------------------
    // 6C. SOYUZ DESCENT MODULE
    // -----------------------------------------------------------------------
    case 'soyuz-capsule': {
      const mHull = makeMaterials();
      createPartGroup('soyuz-hull');
      addMeshToPart('soyuz-hull', trackGeo(new THREE.SphereGeometry(0.95, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65)), mHull.darkCarbon, [0, 0.1, 0]);
      addMeshToPart('soyuz-hull', trackGeo(new THREE.CylinderGeometry(0.95, 1.05, 0.55, 32)), mHull.brushedTitanium, [0, -0.22, 0]);

      const mShield = makeMaterials();
      createPartGroup('soyuz-heat-shield');
      addMeshToPart('soyuz-heat-shield', trackGeo(createDishGeometry(1.08, -0.28, 32)), mShield.heatShieldMat, [0, -0.5, 0]);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        addMeshToPart('soyuz-heat-shield', trackGeo(new THREE.CylinderGeometry(0.07, 0.1, 0.16, 12)), mShield.copperAccent, [Math.cos(a) * 0.45, -0.62, Math.sin(a) * 0.45]);
      }

      const mChute = makeMaterials();
      createPartGroup('soyuz-chute-hatch');
      addMeshToPart('soyuz-chute-hatch', trackGeo(new THREE.CylinderGeometry(0.32, 0.42, 0.25, 20)), mChute.warmOrange, [0, 1.02, 0]);
      addMeshToPart('soyuz-chute-hatch', trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16)), mChute.lensCyan, [0, 0.25, 0.9], [Math.PI / 2, 0, 0]);

      const plasmaGeo = trackGeo(createDishGeometry(1.26, -0.4, 32));
      const plasmaMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: 0xff6b2b,
          transparent: true,
          opacity: 0.0,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      plasmaShell = new THREE.Mesh(plasmaGeo, plasmaMat);
      plasmaShell.position.y = -0.55;
      root.add(plasmaShell);
      break;
    }
  }

  return {
    root,
    parts,
    spinParts,
    wheels,
    beaconRings,
    plasmaShell,
    dispose: () => {
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
    },
  };
}

// =========================================================================
// CUSTOM SPACECRAFT BUILDER MODEL (LIVE 3D ASSEMBLY)
// =========================================================================
export function buildCustomSpacecraftModel(
  config: CustomCraftConfig,
  textures: ProceduralTextureSet
): BuiltSpacecraft {
  const root = new THREE.Group();
  const parts: BuiltPartEntry[] = [];
  const spinParts: { obj: THREE.Object3D; axis: 'x' | 'y' | 'z'; speed: number }[] = [];
  const wheels: THREE.Object3D[] = [];
  const beaconRings: THREE.Mesh[] = [];

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

  const goldMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf4c552,
      map: textures.goldFoilColor,
      bumpMap: textures.goldFoilBump,
      bumpScale: 0.035,
      metalness: 0.88,
      roughness: 0.28,
    })
  );
  const titaniumMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x9aa4b2,
      metalness: 0.85,
      roughness: 0.34,
      bumpMap: textures.metalBrushedBump,
      bumpScale: 0.012,
    })
  );
  const alumMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xe6ecf5,
      metalness: 0.9,
      roughness: 0.16,
      clearcoat: 0.3,
    })
  );
  const solarMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      map: textures.solarPanel,
      metalness: 0.25,
      roughness: 0.22,
      clearcoat: 0.8,
    })
  );
  const whiteMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.1,
      roughness: 0.42,
      side: THREE.DoubleSide,
    })
  );
  const carbonMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x242934,
      metalness: 0.25,
      roughness: 0.65,
    })
  );
  const heatMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x573b2c,
      map: textures.heatShield,
      metalness: 0.1,
      roughness: 0.8,
    })
  );
  const copperMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xd97736,
      metalness: 0.86,
      roughness: 0.26,
    })
  );
  const cyanGlowMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: new THREE.Color(0x0284c7),
      emissiveIntensity: 0.75,
      roughness: 0.2,
    })
  );
  const amberGlowMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: new THREE.Color(0xf59e0b),
      emissiveIntensity: 0.7,
      roughness: 0.2,
    })
  );

  const frameGroup = new THREE.Group();
  frameGroup.position.y = config.propulsion === 'prop-rover-wheels' ? 0.98 : 0;
  root.add(frameGroup);

  const addM = (
    g: THREE.Group,
    slotId: 'core' | 'power' | 'instrument' | 'propulsion',
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    pos: [number, number, number] = [0, 0, 0],
    rot: [number, number, number] = [0, 0, 0]
  ) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos[0], pos[1], pos[2]);
    m.rotation.set(rot[0], rot[1], rot[2]);
    m.castShadow = true;
    m.receiveShadow = true;
    m.layers.enable(1);
    m.userData.partId = slotId;
    g.add(m);
    const entry = parts.find((p) => p.partId === slotId);
    if (entry) entry.meshes.push(m);
    return m;
  };

  // 1. CORE
  const coreGroup = new THREE.Group();
  frameGroup.add(coreGroup);
  parts.push({ partId: 'core', group: coreGroup, meshes: [], basePos: coreGroup.position.clone(), explodeOffset: new THREE.Vector3(0, 0, 0) });
  if (config.core === 'core-crew-capsule') {
    addM(coreGroup, 'core', trackGeo(new THREE.CylinderGeometry(0.45, 1.05, 1.15, 32)), alumMat, [0, 0.05, 0]);
    addM(coreGroup, 'core', trackGeo(createDishGeometry(1.08, -0.25, 32)), heatMat, [0, -0.52, 0]);
    addM(coreGroup, 'core', trackGeo(new THREE.BoxGeometry(0.24, 0.16, 0.1)), cyanGlowMat, [0, 0.2, 0.76], [-0.4, 0, 0]);
  } else if (config.core === 'core-titanium-vault') {
    addM(coreGroup, 'core', trackGeo(createBeveledPolygonGeometry(6, 0.78, 0.92, 0.05)), titaniumMat, [0, 0, 0], [Math.PI / 2, 0, 0]);
    addM(coreGroup, 'core', trackGeo(new THREE.TorusGeometry(0.78, 0.05, 10, 24)), copperMat, [0, 0.35, 0], [Math.PI / 2, 0, 0]);
  } else {
    // core-gold-bus
    addM(coreGroup, 'core', trackGeo(createBeveledPolygonGeometry(8, 0.72, 0.82, 0.04)), goldMat, [0, 0, 0], [Math.PI / 2, 0, 0]);
    addM(coreGroup, 'core', trackGeo(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24)), copperMat, [0.74, 0.05, 0], [0, 0, Math.PI / 2]);
  }

  // 2. POWER
  const powerGroup = new THREE.Group();
  frameGroup.add(powerGroup);
  parts.push({ partId: 'power', group: powerGroup, meshes: [], basePos: powerGroup.position.clone(), explodeOffset: new THREE.Vector3(0, 0, 0) });
  if (config.power === 'power-rtg-battery') {
    [-1, 1].forEach((side) => {
      addM(powerGroup, 'power', trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 10)), titaniumMat, [side * 1.1, 0, 0], [0, 0, Math.PI / 2]);
      addM(powerGroup, 'power', trackGeo(new THREE.CylinderGeometry(0.16, 0.16, 0.52, 16)), carbonMat, [side * 1.78, 0, 0], [0, 0, Math.PI / 2]);
      addM(powerGroup, 'power', trackGeo(new THREE.TorusGeometry(0.17, 0.02, 8, 18)), amberGlowMat, [side * 1.78, 0, 0], [0, Math.PI / 2, 0]);
    });
  } else if (config.power === 'power-shielded-fins') {
    addM(powerGroup, 'power', trackGeo(createBeveledPolygonGeometry(6, 1.15, 0.14, 0.04)), whiteMat, [0, 0.1, 0.92]);
    [-1, 1].forEach((side) => {
      addM(powerGroup, 'power', trackGeo(new THREE.BoxGeometry(1.15, 0.05, 0.52)), solarMat, [side * 1.15, 0, -0.15], [0.3, side * -0.3, 0]);
    });
  } else {
    // power-windmill-solar
    [-1, 1].forEach((side) => {
      addM(powerGroup, 'power', trackGeo(new THREE.BoxGeometry(2.15, 0.06, 0.72)), solarMat, [side * 1.75, 0.08, 0]);
      addM(powerGroup, 'power', trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 0.6, 8)), titaniumMat, [side * 0.72, 0.08, 0], [0, 0, Math.PI / 2]);
    });
  }

  // 3. INSTRUMENT
  const instGroup = new THREE.Group();
  frameGroup.add(instGroup);
  parts.push({ partId: 'instrument', group: instGroup, meshes: [], basePos: instGroup.position.clone(), explodeOffset: new THREE.Vector3(0, 0.4, 0) });
  if (config.instrument === 'inst-mars-mast') {
    addM(instGroup, 'instrument', trackGeo(new THREE.CylinderGeometry(0.06, 0.07, 0.72, 12)), whiteMat, [0, 0.78, 0.15]);
    addM(instGroup, 'instrument', trackGeo(new THREE.BoxGeometry(0.48, 0.18, 0.24)), whiteMat, [0, 1.16, 0.18]);
    addM(instGroup, 'instrument', trackGeo(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12)), cyanGlowMat, [-0.14, 1.16, 0.32], [Math.PI / 2, 0, 0]);
    addM(instGroup, 'instrument', trackGeo(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12)), cyanGlowMat, [0.14, 1.16, 0.32], [Math.PI / 2, 0, 0]);
  } else if (config.instrument === 'inst-ice-radar') {
    addM(instGroup, 'instrument', trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 8)), copperMat, [0, 0.78, 0], [0, 0, Math.PI / 2]);
    addM(instGroup, 'instrument', trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 1.9, 8)), cyanGlowMat, [0, 0.78, 0], [Math.PI / 2, 0, 0]);
    addM(instGroup, 'instrument', trackGeo(new THREE.SphereGeometry(0.16, 16, 12)), whiteMat, [0, 0.78, 0]);
  } else {
    // inst-radio-dish
    addM(instGroup, 'instrument', trackGeo(createDishGeometry(0.98, 0.28, 30)), whiteMat, [0, 0.55, 0]);
    addM(instGroup, 'instrument', trackGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.55, 10)), titaniumMat, [0, 0.85, 0]);
    addM(instGroup, 'instrument', trackGeo(new THREE.SphereGeometry(0.08, 12, 10)), copperMat, [0, 1.12, 0]);
  }

  // 4. PROPULSION
  const propGroup = new THREE.Group();
  frameGroup.add(propGroup);
  parts.push({ partId: 'propulsion', group: propGroup, meshes: [], basePos: propGroup.position.clone(), explodeOffset: new THREE.Vector3(0, -0.4, 0) });
  if (config.propulsion === 'prop-rover-wheels') {
    const wCoords: [number, number, number][] = [
      [-0.78, -0.78, 0.62], [-0.82, -0.78, 0], [-0.78, -0.78, -0.62],
      [0.78, -0.78, 0.62], [0.82, -0.78, 0], [0.78, -0.78, -0.62],
    ];
    wCoords.forEach(([wx, wy, wz]) => {
      const w = addM(propGroup, 'propulsion', trackGeo(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 16)), carbonMat, [wx, wy, wz], [0, 0, Math.PI / 2]);
      wheels.push(w);
      addM(propGroup, 'propulsion', trackGeo(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8)), titaniumMat, [wx * 0.72, -0.52, wz * 0.72], [0, 0, wx < 0 ? -0.5 : 0.5]);
    });
  } else if (config.propulsion === 'prop-rocket-bell') {
    addM(propGroup, 'propulsion', trackGeo(new THREE.ConeGeometry(0.36, 0.52, 20)), carbonMat, [0, -0.78, 0]);
    addM(propGroup, 'propulsion', trackGeo(new THREE.ConeGeometry(0.26, 0.55, 16)), amberGlowMat, [0, -1.16, 0], [Math.PI, 0, 0]);
  } else {
    // prop-ion-thruster
    addM(propGroup, 'propulsion', trackGeo(new THREE.CylinderGeometry(0.28, 0.34, 0.26, 20)), titaniumMat, [0, -0.68, 0]);
    const ionPlume = addM(propGroup, 'propulsion', trackGeo(new THREE.ConeGeometry(0.22, 0.65, 20)), cyanGlowMat, [0, -1.06, 0], [Math.PI, 0, 0]);
    spinParts.push({ obj: ionPlume, axis: 'y', speed: 6 });
  }

  return {
    root,
    parts,
    spinParts,
    wheels,
    beaconRings,
    dispose: () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
    },
  };
}

