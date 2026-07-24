'use strict';

// Composite-contrast checker (DEMO-POLISH-2026-07-24). Per the Slide-Type
// Standard §S5: "contrast is verified on the rendered composite ... not on
// token pairs in isolation." No prior tool in this directory measured
// actual rendered pixels against text color — this fills that gap.
//
// Technique: render normally to read the element's real computed text
// color/size/weight, then re-render with that element's text made
// transparent (so glyph pixels can't contaminate the sample) and read the
// pixels actually sitting behind it — the image, the scrim, and/or a panel
// background, whatever is really there. Reports the WORST-CASE point in the
// element's box, not an average — AA requires the text to be legible
// everywhere it appears, not just on average.

const { PNG } = require('pngjs');

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(rgbA, rgbB) {
  const La = relativeLuminance(rgbA);
  const Lb = relativeLuminance(rgbB);
  const lighter = Math.max(La, Lb);
  const darker = Math.min(La, Lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
  return [parts[0], parts[1], parts[2]];
}

// WCAG AA: large text (>=24px, or >=18.66px and bold) needs 3:1; else 4.5:1.
function aaThreshold(fontSizePx, fontWeight) {
  const isBold = fontWeight >= 700;
  const isLarge = fontSizePx >= 24 || (isBold && fontSizePx >= 18.66);
  return isLarge ? 3.0 : 4.5;
}

function worstCasePoint(png, box, scale) {
  const cols = 7, rows = 5;
  const insetX = Math.max(2, box.width * 0.06);
  const insetY = Math.max(2, box.height * 0.1);
  const points = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cssX = box.x + insetX + (box.width - 2 * insetX) * (cols === 1 ? 0.5 : i / (cols - 1));
      const cssY = box.y + insetY + (box.height - 2 * insetY) * (rows === 1 ? 0.5 : j / (rows - 1));
      const x = Math.round(cssX * scale);
      const y = Math.round(cssY * scale);
      if (x < 0 || y < 0 || x >= png.width || y >= png.height) continue;
      const idx = (png.width * y + x) << 2;
      points.push({ x, y, rgb: [png.data[idx], png.data[idx + 1], png.data[idx + 2]] });
    }
  }
  return points;
}

// Measures composite contrast for `selector`'s own text against whatever
// actually renders behind it. `page` must already be settled on the state
// to measure. Mutates and restores the element's inline color.
async function measureContrast(page, selector) {
  const info = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      color: cs.color,
      fontSize: parseFloat(cs.fontSize),
      fontWeight: parseFloat(cs.fontWeight),
      box: { x: r.x, y: r.y, width: r.width, height: r.height },
    };
  }, selector);
  if (!info || info.box.width === 0 || info.box.height === 0) return null;

  // Make the element's own text invisible (inline style — highest
  // precedence on the element itself) so the "behind" screenshot samples
  // real background pixels, never glyph-antialiasing pixels.
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.dataset.__prevColor = el.style.color;
    el.style.color = 'transparent';
  }, selector);

  const viewport = page.viewportSize();
  const buffer = await page.screenshot();

  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.style.color = el.dataset.__prevColor || '';
    delete el.dataset.__prevColor;
  }, selector);

  const png = PNG.sync.read(buffer);
  const scale = png.width / viewport.width;
  const textRgb = parseRgb(info.color);
  const samples = worstCasePoint(png, info.box, scale).map((p) => ({
    ...p,
    ratio: contrastRatio(textRgb, p.rgb),
  }));
  if (!samples.length) return null;
  const worst = samples.reduce((a, b) => (b.ratio < a.ratio ? b : a));
  const threshold = aaThreshold(info.fontSize, info.fontWeight);

  return {
    selector,
    textRgb,
    fontSize: Math.round(info.fontSize * 100) / 100,
    fontWeight: info.fontWeight,
    worstCaseBg: worst.rgb,
    worstCasePoint: { x: worst.x, y: worst.y },
    contrastRatio: Math.round(worst.ratio * 100) / 100,
    threshold,
    pass: worst.ratio >= threshold,
  };
}

module.exports = { measureContrast, contrastRatio, relativeLuminance, aaThreshold };
