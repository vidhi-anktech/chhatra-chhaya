const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const { execSync } = require('child_process');

const rawSymbolPath = '/Users/vidhi/.gemini/antigravity/brain/88b91091-30e4-4e1a-8a96-228b032c2181/.user_uploaded/media_1793785729692.png';
const rawSymbol = PNG.sync.read(fs.readFileSync(rawSymbolPath));

function sampleSymbol(u, v) {
  if (u < 0 || u > 1 || v < 0 || v > 1) return 0;
  const x = u * (rawSymbol.width - 1);
  const y = v * (rawSymbol.height - 1);
  const x0 = Math.floor(x), x1 = Math.min(x0 + 1, rawSymbol.width - 1);
  const y0 = Math.floor(y), y1 = Math.min(y0 + 1, rawSymbol.height - 1);
  const dx = x - x0, dy = y - y0;
  
  const a00 = rawSymbol.data[(y0 * rawSymbol.width + x0) * 4 + 3];
  const a10 = rawSymbol.data[(y0 * rawSymbol.width + x1) * 4 + 3];
  const a01 = rawSymbol.data[(y1 * rawSymbol.width + x0) * 4 + 3];
  const a11 = rawSymbol.data[(y1 * rawSymbol.width + x1) * 4 + 3];
  
  const top = a00 * (1 - dx) + a10 * dx;
  const bot = a01 * (1 - dx) + a11 * dx;
  return (top * (1 - dy) + bot * dy) / 255;
}

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(v)));
}

// 1. Full Square Option 3 (Full bleed, gold frame, gold symbol)
function generateOption3Square(size = 512, isRound = false, isSquircle = false) {
  const png = new PNG({ width: size, height: size });
  const cx = size / 2;
  const cy = size / 2;
  const cornerR = size * 0.22;
  const borderInset = size * 0.055;

  const symH = size * 0.72;
  const symW = symH * (rawSymbol.width / rawSymbol.height);
  const symLeft = cx - symW / 2;
  const symTop = cy - symH / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      if (isRound) {
        const d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
        if (d > size / 2) {
          png.data[idx + 3] = 0;
          continue;
        }
      } else if (isSquircle) {
        const qx = Math.max(0, Math.abs(x - cx) - (size / 2 - cornerR));
        const qy = Math.max(0, Math.abs(y - cy) - (size / 2 - cornerR));
        const cd = Math.sqrt(qx * qx + qy * qy);
        if (cd > cornerR) {
          png.data[idx + 3] = 0;
          continue;
        }
      }

      // Rich Maroon Background
      const dxNorm = (x - cx) / (size / 2);
      const dyNorm = (y - cy) / (size / 2);
      const centerDistNorm = Math.sqrt(dxNorm * dxNorm + dyNorm * dyNorm);

      let r = 120 - centerDistNorm * 36; // 120 -> 84
      let g = 18 - centerDistNorm * 10;  // 18 -> 8
      let b = 28 - centerDistNorm * 14;  // 28 -> 14

      // Inner elegant gold border frame
      const innerBorderCornerR = isRound ? (size / 2 - borderInset) : (cornerR - borderInset);
      let distFromBorder;
      if (isRound) {
        const d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
        distFromBorder = Math.abs(d - (size / 2 - borderInset));
      } else {
        const bqx = Math.max(0, Math.abs(x - cx) - (size / 2 - borderInset - innerBorderCornerR));
        const bqy = Math.max(0, Math.abs(y - cy) - (size / 2 - borderInset - innerBorderCornerR));
        const bDist = Math.sqrt(bqx * bqx + bqy * bqy);
        distFromBorder = Math.abs(bDist - innerBorderCornerR);
      }

      if (distFromBorder < 2.5) {
        const borderAlpha = Math.max(0, 1 - distFromBorder / 2.5) * 0.92;
        const goldShine = 0.5 + 0.5 * Math.sin(x * 0.02 + y * 0.015);
        const goldR = 238 + goldShine * 17;
        const goldG = 192 + goldShine * 28;
        const goldB = 75 + goldShine * 25;
        r = r * (1 - borderAlpha) + goldR * borderAlpha;
        g = g * (1 - borderAlpha) + goldG * borderAlpha;
        b = b * (1 - borderAlpha) + goldB * borderAlpha;
      }

      // Sample Symbol
      const u = (x - symLeft) / symW;
      const v = (y - symTop) / symH;
      const symAlpha = sampleSymbol(u, v);

      if (symAlpha > 0.01) {
        const goldTop = { r: 255, g: 236, b: 155 };
        const goldMid = { r: 248, g: 194, b: 58 };
        const goldBot = { r: 224, g: 156, b: 30 };
        let symR, symG, symB;

        if (v < 0.5) {
          const t = v / 0.5;
          symR = goldTop.r * (1 - t) + goldMid.r * t;
          symG = goldTop.g * (1 - t) + goldMid.g * t;
          symB = goldTop.b * (1 - t) + goldMid.b * t;
        } else {
          const t = (v - 0.5) / 0.5;
          symR = goldMid.r * (1 - t) + goldBot.r * t;
          symG = goldMid.g * (1 - t) + goldBot.g * t;
          symB = goldMid.b * (1 - t) + goldBot.b * t;
        }

        const a = symAlpha;
        r = r * (1 - a) + symR * a;
        g = g * (1 - a) + symG * a;
        b = b * (1 - a) + symB * a;
      }

      png.data[idx] = clamp(r);
      png.data[idx + 1] = clamp(g);
      png.data[idx + 2] = clamp(b);
      png.data[idx + 3] = 255;
    }
  }

  return png;
}

// 2. Adaptive Icon Foreground (Transparent background, symbol scaled to fit inside safe area)
function generateAdaptiveForeground(size = 432) {
  const png = new PNG({ width: size, height: size });
  const cx = size / 2;
  const cy = size / 2;
  // Adaptive safe area is inner 66% (diameter ~285px in 432px)
  const symH = size * 0.48; // safe height
  const symW = symH * (rawSymbol.width / rawSymbol.height);
  const symLeft = cx - symW / 2;
  const symTop = cy - symH / 2;

  // Inset border around safe area
  const borderR = size * 0.28;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      const d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      let outR = 0, outG = 0, outB = 0, outA = 0;

      // Circular gold border ring at safe boundary
      const distFromBorder = Math.abs(d - borderR);
      if (distFromBorder < 2.5) {
        const borderAlpha = Math.max(0, 1 - distFromBorder / 2.5) * 0.9;
        const goldShine = 0.5 + 0.5 * Math.sin(x * 0.02 + y * 0.015);
        outR = 238 + goldShine * 17;
        outG = 192 + goldShine * 28;
        outB = 75 + goldShine * 25;
        outA = borderAlpha;
      }

      // Sample Symbol
      const u = (x - symLeft) / symW;
      const v = (y - symTop) / symH;
      const symAlpha = sampleSymbol(u, v);

      if (symAlpha > 0.01) {
        const goldTop = { r: 255, g: 236, b: 155 };
        const goldMid = { r: 248, g: 194, b: 58 };
        const goldBot = { r: 224, g: 156, b: 30 };
        let symR, symG, symB;

        if (v < 0.5) {
          const t = v / 0.5;
          symR = goldTop.r * (1 - t) + goldMid.r * t;
          symG = goldTop.g * (1 - t) + goldMid.g * t;
          symB = goldTop.b * (1 - t) + goldMid.b * t;
        } else {
          const t = (v - 0.5) / 0.5;
          symR = goldMid.r * (1 - t) + goldBot.r * t;
          symG = goldMid.g * (1 - t) + goldBot.g * t;
          symB = goldMid.b * (1 - t) + goldBot.b * t;
        }

        const a = symAlpha;
        outR = outR * (1 - a) + symR * a;
        outG = outG * (1 - a) + symG * a;
        outB = outB * (1 - a) + symB * a;
        outA = Math.max(outA, a);
      }

      png.data[idx] = clamp(outR);
      png.data[idx + 1] = clamp(outG);
      png.data[idx + 2] = clamp(outB);
      png.data[idx + 3] = clamp(outA * 255);
    }
  }

  return png;
}

console.log('Rendering 1024x1024 Master Icon...');
const masterSquare = generateOption3Square(1024, false, false);
fs.writeFileSync('assets/icon.png', PNG.sync.write(masterSquare));

console.log('Rendering 512x512 Assets...');
const icon512 = generateOption3Square(512, false, false);
fs.writeFileSync('assets/images/jain_symbol.png', PNG.sync.write(icon512));
fs.writeFileSync('assets/images/jain_emblem.png', PNG.sync.write(icon512));
fs.writeFileSync('assets/splash.png', PNG.sync.write(icon512));

// Backup guru_emblem if not already backed up
if (!fs.existsSync('assets/images/guru_emblem_original.png') && fs.existsSync('assets/images/guru_emblem.png')) {
  fs.copyFileSync('assets/images/guru_emblem.png', 'assets/images/guru_emblem_original.png');
}
fs.writeFileSync('assets/images/guru_emblem.png', PNG.sync.write(icon512));

console.log('Rendering Adaptive Icon Foreground...');
const adaptiveFg = generateAdaptiveForeground(512);
fs.writeFileSync('assets/adaptive-icon.png', PNG.sync.write(adaptiveFg));

console.log('Master assets written successfully.');

// Generate Round Icon for ic_launcher_round
const roundIcon = generateOption3Square(512, true, false);
fs.writeFileSync('assets/images/round_icon_master.png', PNG.sync.write(roundIcon));

// Android Mipmap dimensions
const mipmaps = [
  { dir: 'mipmap-mdpi', size: 48, fgSize: 108 },
  { dir: 'mipmap-hdpi', size: 72, fgSize: 162 },
  { dir: 'mipmap-xhdpi', size: 96, fgSize: 216 },
  { dir: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
  { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
];

mipmaps.forEach(m => {
  const base = `android/app/src/main/res/${m.dir}`;
  if (fs.existsSync(base)) {
    execSync(`sips -z ${m.size} ${m.size} assets/images/jain_symbol.png --out ${base}/ic_launcher.png`);
    execSync(`sips -z ${m.size} ${m.size} assets/images/round_icon_master.png --out ${base}/ic_launcher_round.png`);
    execSync(`sips -z ${m.fgSize} ${m.fgSize} assets/adaptive-icon.png --out ${base}/ic_launcher_foreground.png`);
  }
});

// Splashscreen logo dimensions
const splashDrawables = [
  { dir: 'drawable-mdpi', size: 288 },
  { dir: 'drawable-hdpi', size: 432 },
  { dir: 'drawable-xhdpi', size: 576 },
  { dir: 'drawable-xxhdpi', size: 864 },
  { dir: 'drawable-xxxhdpi', size: 1152 },
];

splashDrawables.forEach(s => {
  const file = `android/app/src/main/res/${s.dir}/splashscreen_logo.png`;
  if (fs.existsSync(file)) {
    execSync(`sips -z ${s.size} ${s.size} assets/images/jain_symbol.png --out ${file}`);
  }
});

console.log('All Android mipmap and splashscreen resources generated!');
