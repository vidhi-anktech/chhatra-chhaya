const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const rawSymbolPath = '/Users/vidhi/.gemini/antigravity/brain/88b91091-30e4-4e1a-8a96-228b032c2181/.user_uploaded/media_1793785729692.png';
const artifactDir = '/Users/vidhi/.gemini/antigravity/brain/88b91091-30e4-4e1a-8a96-228b032c2181';

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

// Generate circular medallion emblem
function generateEmblem({ mode = 'gold', size = 512, transparentCanvas = false }) {
  const png = new PNG({ width: size, height: size });
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.40; // radius of maroon plate
  const outerR = R + size * 0.04; // outer gold ring
  const innerR = R - size * 0.015; // inner gold ring

  // Symbol sizing
  const symH = R * 1.48;
  const symW = symH * (rawSymbol.width / rawSymbol.height);
  const symLeft = cx - symW / 2;
  const symTop = cy - symH / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default canvas background
      let bgR = 249, bgG = 249, bgB = 255, bgA = transparentCanvas ? 0 : 255;

      // Outer soft aura glow
      if (!transparentCanvas && dist < outerR + 25) {
        const glowFactor = Math.max(0, 1 - (dist - outerR) / 25);
        if (glowFactor > 0) {
          bgR = Math.round(bgR * (1 - glowFactor * 0.3) + 255 * (glowFactor * 0.3));
          bgG = Math.round(bgG * (1 - glowFactor * 0.3) + 219 * (glowFactor * 0.3));
          bgB = Math.round(bgB * (1 - glowFactor * 0.3) + 160 * (glowFactor * 0.3));
        }
      }

      // Outer Gold Rim (outerR - 3 to outerR + 2)
      if (dist >= R && dist <= outerR + 2) {
        const goldAngle = Math.atan2(dy, dx);
        const goldShine = 0.5 + 0.5 * Math.sin(goldAngle * 2 + 1.2);
        const rimR = 212 + goldShine * 40;
        const rimG = 165 + goldShine * 40;
        const rimB = 55 + goldShine * 25;
        
        // Antialias outer edge
        const edgeAlpha = dist > outerR ? Math.max(0, 1 - (dist - outerR) / 2) : 1;
        bgR = Math.round(bgR * (1 - edgeAlpha) + rimR * edgeAlpha);
        bgG = Math.round(bgG * (1 - edgeAlpha) + rimG * edgeAlpha);
        bgB = Math.round(bgB * (1 - edgeAlpha) + rimB * edgeAlpha);
        if (transparentCanvas) bgA = Math.round(255 * edgeAlpha);
      }

      // Maroon inner circle
      if (dist < R) {
        // Antialias inside edge of outer rim
        const maroonAlpha = Math.min(1, (R - dist) / 1.5);

        // Rich radial gradient: center is #7E1022, perimeter is #560411
        const gradT = dist / R;
        let mR = 126 * (1 - gradT * 0.35); // 126 -> 82
        let mG = 16 * (1 - gradT * 0.6);   // 16 -> 6
        let mB = 32 * (1 - gradT * 0.5);   // 32 -> 16

        // Secondary delicate inner gold ring at innerR (width ~ 2px)
        const ringDist = Math.abs(dist - innerR);
        if (ringDist < 2.5) {
          const ringAlpha = Math.max(0, 1 - ringDist / 2.5) * 0.85;
          const goldAngle = Math.atan2(dy, dx);
          const goldShine = 0.5 + 0.5 * Math.sin(goldAngle * 2 + 1.2);
          const inGoldR = 230 + goldShine * 25;
          const inGoldG = 185 + goldShine * 35;
          const inGoldB = 70 + goldShine * 30;
          mR = mR * (1 - ringAlpha) + inGoldR * ringAlpha;
          mG = mG * (1 - ringAlpha) + inGoldG * ringAlpha;
          mB = mB * (1 - ringAlpha) + inGoldB * ringAlpha;
        }

        // Ambient subtle golden ray bursts (sunburst)
        const angle = Math.atan2(dy, dx);
        const rayIntensity = Math.pow(Math.cos(angle * 16), 4) * (1 - gradT) * 0.08;
        mR += rayIntensity * 120;
        mG += rayIntensity * 80;

        bgR = Math.round(bgR * (1 - maroonAlpha) + mR * maroonAlpha);
        bgG = Math.round(bgG * (1 - maroonAlpha) + mG * maroonAlpha);
        bgB = Math.round(bgB * (1 - maroonAlpha) + mB * maroonAlpha);
        bgA = 255;
      }

      // Place Symbol
      const u = (x - symLeft) / symW;
      const v = (y - symTop) / symH;
      const symAlpha = sampleSymbol(u, v);

      if (symAlpha > 0.01) {
        let symR, symG, symB;

        if (mode === 'gold') {
          // Radiant Gold gradient from top to bottom
          const goldTop = { r: 255, g: 236, b: 155 };
          const goldMid = { r: 248, g: 194, b: 58 };
          const goldBot = { r: 224, g: 156, b: 30 };

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
        } else if (mode === 'white') {
          symR = 255;
          symG = 255;
          symB = 255;
        } else if (mode === 'original_black') {
          symR = 15;
          symG = 5;
          symB = 8;
        }

        const a = symAlpha;
        bgR = Math.round(bgR * (1 - a) + symR * a);
        bgG = Math.round(bgG * (1 - a) + symG * a);
        bgB = Math.round(bgB * (1 - a) + symB * a);
      }

      png.data[idx] = clamp(bgR);
      png.data[idx + 1] = clamp(bgG);
      png.data[idx + 2] = clamp(bgB);
      png.data[idx + 3] = clamp(bgA);
    }
  }

  return png;
}

// Generate App Icon (Square with rounded corners / squircle background)
function generateAppIcon({ mode = 'gold', size = 512 }) {
  const png = new PNG({ width: size, height: size });
  const cx = size / 2;
  const cy = size / 2;
  const cornerR = size * 0.22; // smooth squircle corner
  const borderInset = size * 0.05;

  // Symbol sizing
  const symH = size * 0.72;
  const symW = symH * (rawSymbol.width / rawSymbol.height);
  const symLeft = cx - symW / 2;
  const symTop = cy - symH / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      const qx = Math.max(0, Math.abs(x - cx) - (size / 2 - cornerR));
      const qy = Math.max(0, Math.abs(y - cy) - (size / 2 - cornerR));
      const cornerDist = Math.sqrt(qx * qx + qy * qy);

      if (cornerDist > cornerR) {
        png.data[idx] = 0;
        png.data[idx + 1] = 0;
        png.data[idx + 2] = 0;
        png.data[idx + 3] = 0;
        continue;
      }

      const cornerAlpha = Math.min(1, Math.max(0, cornerR - cornerDist));

      const dxNorm = (x - cx) / (size / 2);
      const dyNorm = (y - cy) / (size / 2);
      const centerDistNorm = Math.sqrt(dxNorm * dxNorm + dyNorm * dyNorm);

      let r = 118 - centerDistNorm * 35;
      let g = 18 - centerDistNorm * 10;
      let b = 28 - centerDistNorm * 14;

      // Inner elegant gold border frame
      const innerBorderCornerR = cornerR - borderInset;
      const bqx = Math.max(0, Math.abs(x - cx) - (size / 2 - borderInset - innerBorderCornerR));
      const bqy = Math.max(0, Math.abs(y - cy) - (size / 2 - borderInset - innerBorderCornerR));
      const bDist = Math.sqrt(bqx * bqx + bqy * bqy);
      const distFromBorder = Math.abs(bDist - innerBorderCornerR);

      if (distFromBorder < 2.5) {
        const borderAlpha = Math.max(0, 1 - distFromBorder / 2.5) * 0.9;
        const goldShine = 0.5 + 0.5 * Math.sin(x * 0.02 + y * 0.01);
        const goldR = 235 + goldShine * 20;
        const goldG = 190 + goldShine * 30;
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
        let symR, symG, symB;
        if (mode === 'gold') {
          const goldTop = { r: 255, g: 236, b: 155 };
          const goldMid = { r: 248, g: 194, b: 58 };
          const goldBot = { r: 224, g: 156, b: 30 };
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
        } else {
          symR = 255; symG = 255; symB = 255;
        }

        const a = symAlpha;
        r = r * (1 - a) + symR * a;
        g = g * (1 - a) + symG * a;
        b = b * (1 - a) + symB * a;
      }

      png.data[idx] = clamp(r);
      png.data[idx + 1] = clamp(g);
      png.data[idx + 2] = clamp(b);
      png.data[idx + 3] = clamp(255 * cornerAlpha);
    }
  }

  return png;
}

// Side-by-side Showcase Sheet (1600 x 560)
function generateShowcaseSheet(img1, img2, img3) {
  const width = 1600;
  const height = 560;
  const board = new PNG({ width, height });

  for (let i = 0; i < board.data.length; i += 4) {
    board.data[i] = 248;
    board.data[i + 1] = 249;
    board.data[i + 2] = 253;
    board.data[i + 3] = 255;
  }

  function blit(src, targetX, targetY) {
    for (let y = 0; y < src.height; y++) {
      for (let x = 0; x < src.width; x++) {
        const srcIdx = (y * src.width + x) * 4;
        const dstIdx = ((targetY + y) * width + (targetX + x)) * 4;
        const sa = src.data[srcIdx + 3] / 255;
        if (sa <= 0) continue;
        const dr = board.data[dstIdx];
        const dg = board.data[dstIdx + 1];
        const db = board.data[dstIdx + 2];
        const sr = src.data[srcIdx];
        const sg = src.data[srcIdx + 1];
        const sb = src.data[srcIdx + 2];

        board.data[dstIdx] = clamp(dr * (1 - sa) + sr * sa);
        board.data[dstIdx + 1] = clamp(dg * (1 - sa) + sg * sa);
        board.data[dstIdx + 2] = clamp(db * (1 - sa) + sb * sa);
        board.data[dstIdx + 3] = 255;
      }
    }
  }

  blit(img1, 40, 24);
  blit(img2, 560, 24);
  blit(img3, 1080, 24);

  return board;
}

console.log('Generating Option 1: Sacred Gold Emblem...');
const goldEmblem = generateEmblem({ mode: 'gold', size: 512 });
fs.writeFileSync(path.join(artifactDir, 'preview_option1_gold_emblem.png'), PNG.sync.write(goldEmblem));
fs.writeFileSync('assets/images/preview_option1_gold_emblem.png', PNG.sync.write(goldEmblem));

console.log('Generating Option 2: Luminous White Emblem...');
const whiteEmblem = generateEmblem({ mode: 'white', size: 512 });
fs.writeFileSync(path.join(artifactDir, 'preview_option2_white_emblem.png'), PNG.sync.write(whiteEmblem));
fs.writeFileSync('assets/images/preview_option2_white_emblem.png', PNG.sync.write(whiteEmblem));

console.log('Generating Option 3: App Icon Squircle (Full Bleed Maroon)...');
const appIcon = generateAppIcon({ mode: 'gold', size: 512 });
fs.writeFileSync(path.join(artifactDir, 'preview_option3_app_icon.png'), PNG.sync.write(appIcon));
fs.writeFileSync('assets/images/preview_option3_app_icon.png', PNG.sync.write(appIcon));

console.log('Generating Comparison Board...');
const showcase = generateShowcaseSheet(goldEmblem, whiteEmblem, appIcon);
fs.writeFileSync(path.join(artifactDir, 'preview_comparison_board.png'), PNG.sync.write(showcase));
fs.writeFileSync('assets/images/preview_comparison_board.png', PNG.sync.write(showcase));

console.log('All previews generated successfully!');
