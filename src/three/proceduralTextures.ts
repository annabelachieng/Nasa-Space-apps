import * as THREE from 'three';

export interface ProceduralTextureSet {
  goldFoilColor: THREE.CanvasTexture;
  goldFoilBump: THREE.CanvasTexture;
  solarPanel: THREE.CanvasTexture;
  goldenRecord: THREE.CanvasTexture;
  metalBrushedBump: THREE.CanvasTexture;
  heatShield: THREE.CanvasTexture;
  marsSurface: THREE.CanvasTexture;
  marsPolarSurface: THREE.CanvasTexture;
  venusSurface: THREE.CanvasTexture;
  cometSurface: THREE.CanvasTexture;
  earthSurface: THREE.CanvasTexture;
  jupiterSurface: THREE.CanvasTexture;
  saturnSurface: THREE.CanvasTexture;
  saturnRings: THREE.CanvasTexture;
  mercurySurface: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  dispose: () => void;
}

function createCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  return [canvas, ctx];
}

function finalizeTexture(
  canvas: HTMLCanvasElement,
  isColor: boolean,
  maxAniso: number,
  repeatX = 1,
  repeatY = 1
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = maxAniso;
  tex.needsUpdate = true;
  return tex;
}

export function createProceduralTextures(maxAniso = 4): ProceduralTextureSet {
  const allTextures: THREE.CanvasTexture[] = [];

  // 1. Gold Kapton Foil Color & Bump
  const [goldC, goldCtx] = createCanvas(256, 256);
  const [goldBC, goldBCtx] = createCanvas(256, 256);
  goldCtx.fillStyle = '#d49b28';
  goldCtx.fillRect(0, 0, 256, 256);
  goldBCtx.fillStyle = '#808080';
  goldBCtx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 420; i++) {
    const x = (Math.sin(i * 12.9898) * 0.5 + 0.5) * 256;
    const y = (Math.cos(i * 78.233) * 0.5 + 0.5) * 256;
    const sz = 10 + (i % 18);
    const angle = (i * 1.7) % Math.PI;
    goldCtx.save();
    goldCtx.translate(x, y);
    goldCtx.rotate(angle);
    goldCtx.fillStyle = i % 2 === 0 ? 'rgba(255,216,107,0.22)' : 'rgba(138,85,12,0.22)';
    goldCtx.fillRect(-sz / 2, -2, sz, 4);
    goldCtx.restore();

    goldBCtx.save();
    goldBCtx.translate(x, y);
    goldBCtx.rotate(angle);
    goldBCtx.fillStyle = i % 2 === 0 ? 'rgba(230,230,230,0.35)' : 'rgba(40,40,40,0.35)';
    goldBCtx.fillRect(-sz / 2, -2, sz, 4);
    goldBCtx.restore();
  }
  const goldFoilColor = finalizeTexture(goldC, true, maxAniso, 2, 2);
  const goldFoilBump = finalizeTexture(goldBC, false, maxAniso, 2, 2);
  allTextures.push(goldFoilColor, goldFoilBump);

  // 2. Solar Panel Photovoltaic Grid
  const [solarC, solarCtx] = createCanvas(512, 256);
  solarCtx.fillStyle = '#0c1f44';
  solarCtx.fillRect(0, 0, 512, 256);
  const cols = 16;
  const rows = 8;
  const cw = 512 / cols;
  const ch = 256 / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const shade = ((r + c) % 3) * 6;
      solarCtx.fillStyle = `rgb(${12 + shade}, ${38 + shade}, ${88 + shade})`;
      solarCtx.fillRect(c * cw + 2, r * ch + 2, cw - 4, ch - 4);
      // Thin silver busbar
      solarCtx.fillStyle = 'rgba(186, 214, 255, 0.35)';
      solarCtx.fillRect(c * cw + cw * 0.48, r * ch + 2, 1.5, ch - 4);
    }
  }
  // Copper/gold edge buslines
  solarCtx.strokeStyle = '#d4a13e';
  solarCtx.lineWidth = 4;
  solarCtx.strokeRect(2, 2, 508, 252);
  const solarPanel = finalizeTexture(solarC, true, maxAniso);
  allTextures.push(solarPanel);

  // 3. Voyager Golden Record Cover
  const [recC, recCtx] = createCanvas(256, 256);
  recCtx.fillStyle = '#e5b84b';
  recCtx.fillRect(0, 0, 256, 256);
  const recGrad = recCtx.createRadialGradient(128, 128, 12, 128, 128, 124);
  recGrad.addColorStop(0, '#ffe38e');
  recGrad.addColorStop(0.7, '#d49e2a');
  recGrad.addColorStop(1, '#9d6e14');
  recCtx.fillStyle = recGrad;
  recCtx.beginPath();
  recCtx.arc(128, 128, 120, 0, Math.PI * 2);
  recCtx.fill();
  // Grooves & etched diagrams
  recCtx.strokeStyle = 'rgba(92, 58, 6, 0.65)';
  recCtx.lineWidth = 2;
  for (let rad = 28; rad <= 108; rad += 16) {
    recCtx.beginPath();
    recCtx.arc(128, 128, rad, 0, Math.PI * 2);
    recCtx.stroke();
  }
  // Pulsar map rays
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    recCtx.beginPath();
    recCtx.moveTo(86, 152);
    recCtx.lineTo(86 + Math.cos(a) * (18 + (i % 4) * 7), 152 + Math.sin(a) * (18 + (i % 4) * 7));
    recCtx.stroke();
  }
  const goldenRecord = finalizeTexture(recC, true, maxAniso);
  allTextures.push(goldenRecord);

  // 4. Brushed Metal Bump
  const [metC, metCtx] = createCanvas(256, 256);
  metCtx.fillStyle = '#808080';
  metCtx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 2) {
    const v = 110 + ((y * 37) % 36);
    metCtx.fillStyle = `rgb(${v},${v},${v})`;
    metCtx.fillRect(0, y, 256, 1);
  }
  const metalBrushedBump = finalizeTexture(metC, false, maxAniso, 2, 2);
  allTextures.push(metalBrushedBump);

  // 5. Heat Shield Ablative Honeycomb
  const [hsC, hsCtx] = createCanvas(256, 256);
  hsCtx.fillStyle = '#362721';
  hsCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 160; i++) {
    const x = ((i * 53) % 256);
    const y = ((i * 97) % 256);
    hsCtx.fillStyle = i % 3 === 0 ? '#5c3c2e' : '#241814';
    hsCtx.beginPath();
    hsCtx.arc(x, y, 6 + (i % 7), 0, Math.PI * 2);
    hsCtx.fill();
  }
  const heatShield = finalizeTexture(hsC, true, maxAniso, 2, 2);
  allTextures.push(heatShield);

  // 6. Mars Surface Regolith
  const [marsC, marsCtx] = createCanvas(512, 512);
  marsCtx.fillStyle = '#b65432';
  marsCtx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 650; i++) {
    const x = (Math.sin(i * 4.13) * 0.5 + 0.5) * 512;
    const y = (Math.cos(i * 7.77) * 0.5 + 0.5) * 512;
    const r = 3 + (i % 18);
    marsCtx.fillStyle = i % 3 === 0 ? 'rgba(155,66,38,0.38)' : i % 2 === 0 ? 'rgba(210,115,72,0.28)' : 'rgba(92,38,24,0.25)';
    marsCtx.beginPath();
    marsCtx.arc(x, y, r, 0, Math.PI * 2);
    marsCtx.fill();
  }
  const marsSurface = finalizeTexture(marsC, true, maxAniso, 4, 4);
  allTextures.push(marsSurface);

  // 7. Earth Surface
  const [earthC, earthCtx] = createCanvas(512, 256);
  const oceanGrad = earthCtx.createLinearGradient(0, 0, 0, 256);
  oceanGrad.addColorStop(0, '#dbeafe');
  oceanGrad.addColorStop(0.12, '#1d4ed8');
  oceanGrad.addColorStop(0.5, '#0369a1');
  oceanGrad.addColorStop(0.88, '#1d4ed8');
  oceanGrad.addColorStop(1, '#dbeafe');
  earthCtx.fillStyle = oceanGrad;
  earthCtx.fillRect(0, 0, 512, 256);
  // Stylized continents
  earthCtx.fillStyle = '#2d8a4e';
  const continents = [
    [90, 85, 55, 42],
    [135, 145, 38, 52],
    [250, 75, 78, 45],
    [280, 128, 48, 56],
    [390, 90, 66, 44],
    [420, 165, 36, 28],
  ];
  continents.forEach(([x, y, rx, ry]) => {
    earthCtx.beginPath();
    earthCtx.ellipse(x, y, rx, ry, 0.25, 0, Math.PI * 2);
    earthCtx.fill();
  });
  // Cloud swirls
  earthCtx.fillStyle = 'rgba(255,255,255,0.42)';
  for (let i = 0; i < 45; i++) {
    const cx = (i * 73) % 512;
    const cy = 24 + ((i * 41) % 208);
    earthCtx.beginPath();
    earthCtx.ellipse(cx, cy, 28 + (i % 24), 6 + (i % 5), 0.1, 0, Math.PI * 2);
    earthCtx.fill();
  }
  const earthSurface = finalizeTexture(earthC, true, maxAniso);
  allTextures.push(earthSurface);

  // 8. Jupiter Surface (bands + Great Red Spot + polar aurora blue tint)
  const [jupC, jupCtx] = createCanvas(512, 256);
  const jupGrad = jupCtx.createLinearGradient(0, 0, 0, 256);
  jupGrad.addColorStop(0.0, '#4d658a');
  jupGrad.addColorStop(0.14, '#b88f64');
  jupGrad.addColorStop(0.26, '#eed8be');
  jupGrad.addColorStop(0.38, '#c27143');
  jupGrad.addColorStop(0.5, '#f2dfc7');
  jupGrad.addColorStop(0.62, '#c86c3b');
  jupGrad.addColorStop(0.76, '#e7c9a6');
  jupGrad.addColorStop(0.88, '#9d795a');
  jupGrad.addColorStop(1.0, '#4d658a');
  jupCtx.fillStyle = jupGrad;
  jupCtx.fillRect(0, 0, 512, 256);
  // Subtle turbulent streaks
  for (let i = 0; i < 65; i++) {
    jupCtx.fillStyle = i % 2 === 0 ? 'rgba(255,245,230,0.22)' : 'rgba(130,68,36,0.2)';
    jupCtx.fillRect((i * 47) % 512, 24 + ((i * 29) % 208), 55 + (i % 60), 3);
  }
  // Great Red Spot
  jupCtx.fillStyle = '#c94c2c';
  jupCtx.beginPath();
  jupCtx.ellipse(310, 158, 34, 19, 0, 0, Math.PI * 2);
  jupCtx.fill();
  jupCtx.strokeStyle = '#f2b88c';
  jupCtx.lineWidth = 3;
  jupCtx.stroke();
  const jupiterSurface = finalizeTexture(jupC, true, maxAniso);
  allTextures.push(jupiterSurface);

  // 9. Saturn Surface
  const [satC, satCtx] = createCanvas(512, 256);
  const satGrad = satCtx.createLinearGradient(0, 0, 0, 256);
  satGrad.addColorStop(0, '#9ba290');
  satGrad.addColorStop(0.2, '#e2ca96');
  satGrad.addColorStop(0.4, '#f3e1b6');
  satGrad.addColorStop(0.55, '#d6b479');
  satGrad.addColorStop(0.75, '#ecd5a1');
  satGrad.addColorStop(1, '#8e9585');
  satCtx.fillStyle = satGrad;
  satCtx.fillRect(0, 0, 512, 256);
  const saturnSurface = finalizeTexture(satC, true, maxAniso);
  allTextures.push(saturnSurface);

  // 10. Saturn Rings (radial 1D strip mapped across u: inner -> outer)
  const [ringC, ringCtx] = createCanvas(512, 32);
  ringCtx.clearRect(0, 0, 512, 32);
  for (let x = 0; x < 512; x++) {
    const t = x / 512;
    let alpha = 0;
    let r = 232;
    let g = 212;
    let b = 172;
    if (t > 0.08 && t < 0.25) {
      // C ring (faint)
      alpha = 0.25;
      r = 185;
      g = 170;
      b = 148;
    } else if (t >= 0.25 && t < 0.62) {
      // B ring (bright dense)
      alpha = 0.85 - Math.sin(t * 95) * 0.12;
      r = 242;
      g = 224;
      b = 186;
    } else if (t >= 0.62 && t < 0.69) {
      // Cassini Division gap!
      alpha = 0.06;
    } else if (t >= 0.69 && t < 0.94) {
      // A ring
      alpha = 0.65 - Math.cos(t * 110) * 0.1;
      r = 220;
      g = 205;
      b = 175;
    }
    ringCtx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ringCtx.fillRect(x, 0, 1, 32);
  }
  const saturnRings = new THREE.CanvasTexture(ringC);
  saturnRings.colorSpace = THREE.SRGBColorSpace;
  saturnRings.anisotropy = maxAniso;
  saturnRings.needsUpdate = true;
  allTextures.push(saturnRings);

  // 11. Mercury Cratered Surface
  const [mercC, mercCtx] = createCanvas(512, 256);
  mercCtx.fillStyle = '#737882';
  mercCtx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 240; i++) {
    const x = (Math.sin(i * 19.7) * 0.5 + 0.5) * 512;
    const y = (Math.cos(i * 31.3) * 0.5 + 0.5) * 256;
    const r = 3 + (i % 15);
    mercCtx.fillStyle = i % 2 === 0 ? 'rgba(54,58,66,0.55)' : 'rgba(148,154,166,0.4)';
    mercCtx.beginPath();
    mercCtx.arc(x, y, r, 0, Math.PI * 2);
    mercCtx.fill();
    mercCtx.strokeStyle = 'rgba(205,212,224,0.3)';
    mercCtx.lineWidth = 1.2;
    mercCtx.stroke();
  }
  const mercurySurface = finalizeTexture(mercC, true, maxAniso);
  allTextures.push(mercurySurface);

  // 12. Soft radial contact shadow
  const [shadC, shadCtx] = createCanvas(128, 128);
  const shadGrad = shadCtx.createRadialGradient(64, 64, 8, 64, 64, 62);
  shadGrad.addColorStop(0, 'rgba(12, 6, 4, 0.72)');
  shadGrad.addColorStop(0.55, 'rgba(12, 6, 4, 0.3)');
  shadGrad.addColorStop(1, 'rgba(12, 6, 4, 0.0)');
  shadCtx.fillStyle = shadGrad;
  shadCtx.fillRect(0, 0, 128, 128);
  const contactShadow = new THREE.CanvasTexture(shadC);
  contactShadow.colorSpace = THREE.SRGBColorSpace;
  contactShadow.needsUpdate = true;
  allTextures.push(contactShadow);

  // 13. Mars Polar Permafrost & Water Ice Surface
  const [polarC, polarCtx] = createCanvas(512, 512);
  polarCtx.fillStyle = '#8b5744';
  polarCtx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 420; i++) {
    const x = (Math.sin(i * 6.31) * 0.5 + 0.5) * 512;
    const y = (Math.cos(i * 9.17) * 0.5 + 0.5) * 512;
    const r = 4 + (i % 20);
    polarCtx.fillStyle = i % 3 === 0 ? 'rgba(218,228,242,0.42)' : i % 2 === 0 ? 'rgba(122,74,56,0.35)' : 'rgba(66,46,42,0.28)';
    polarCtx.beginPath();
    polarCtx.arc(x, y, r, 0, Math.PI * 2);
    polarCtx.fill();
  }
  const marsPolarSurface = finalizeTexture(polarC, true, maxAniso, 4, 4);
  allTextures.push(marsPolarSurface);

  // 14. Venus Scorched Basalt & Ochre Dust Surface
  const [venC, venCtx] = createCanvas(512, 512);
  venCtx.fillStyle = '#5c3112';
  venCtx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 520; i++) {
    const x = (Math.sin(i * 5.71) * 0.5 + 0.5) * 512;
    const y = (Math.cos(i * 11.43) * 0.5 + 0.5) * 512;
    const r = 5 + (i % 24);
    venCtx.fillStyle = i % 3 === 0 ? 'rgba(180,104,28,0.32)' : i % 2 === 0 ? 'rgba(54,28,12,0.42)' : 'rgba(218,142,46,0.2)';
    venCtx.beginPath();
    venCtx.arc(x, y, r, 0, Math.PI * 2);
    venCtx.fill();
  }
  const venusSurface = finalizeTexture(venC, true, maxAniso, 4, 4);
  allTextures.push(venusSurface);

  // 15. Comet 67P Charcoal Dust & Icy Patch Surface
  const [comC, comCtx] = createCanvas(512, 512);
  comCtx.fillStyle = '#1e222b';
  comCtx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 480; i++) {
    const x = (Math.sin(i * 8.19) * 0.5 + 0.5) * 512;
    const y = (Math.cos(i * 13.37) * 0.5 + 0.5) * 512;
    const r = 3 + (i % 16);
    comCtx.fillStyle = i % 9 === 0 ? 'rgba(148,163,184,0.22)' : i % 2 === 0 ? 'rgba(48,54,68,0.45)' : 'rgba(15,18,24,0.45)';
    comCtx.beginPath();
    comCtx.arc(x, y, r, 0, Math.PI * 2);
    comCtx.fill();
  }
  const cometSurface = finalizeTexture(comC, true, maxAniso, 4, 4);
  allTextures.push(cometSurface);

  return {
    goldFoilColor,
    goldFoilBump,
    solarPanel,
    goldenRecord,
    metalBrushedBump,
    heatShield,
    marsSurface,
    marsPolarSurface,
    venusSurface,
    cometSurface,
    earthSurface,
    jupiterSurface,
    saturnSurface,
    saturnRings,
    mercurySurface,
    contactShadow,
    dispose: () => {
      allTextures.forEach((t) => t.dispose());
    },
  };
}
