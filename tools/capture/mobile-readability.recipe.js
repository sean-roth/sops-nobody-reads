'use strict';

// Capture recipe for MOBILE-READABILITY-2026-07-23. Run with:
//   node mobile-readability.recipe.js before   (pre-fix)
//   node mobile-readability.recipe.js after    (post-fix)
// Desktop 1440 (R4 evidence) + phone captures of slides 20/25 (eyes-on gate).

const path = require('path');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle, shoot } = require('./lib');
const { setDarkMode } = require('./loto-player');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');
const OUT_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'screenshots', 'mobile-readability');

const PHONE_VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];
const DESKTOP_VIEWPORT = { name: '1440x900', width: 1440, height: 900 };
const MODES = ['light', 'dark'];

// 0-indexed: slide-20 -> 19, slide-25 -> 24 (module-01 is the only module this pass fixes content for).
const WAYPOINTS = [
  { name: 'slide20', index: 19 },
  { name: 'slide25', index: 24 },
];

async function gotoSlide(page, index) {
  await page.evaluate((i) => {
    quizMode = false;
    currentSlide = i;
    renderSlide();
    updateProgress();
    updateNavButtons();
  }, index);
}

async function capturePhone(browser, port, tag) {
  for (const viewport of PHONE_VIEWPORTS) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, viewport);
      await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
      await settle(page);
      await setDarkMode(page, { isPhoneWidth: true, wantDark: mode === 'dark' });

      for (const wp of WAYPOINTS) {
        await gotoSlide(page, wp.index);
        await settle(page);
        await shoot(page, path.join(OUT_DIR, `${viewport.name}-${mode}-${wp.name}-${tag}.png`));
      }
      if (page.errors.length) console.error(`Errors ${viewport.name}/${mode}:`, page.errors.map((e) => e.message));
      await page.close();
    }
  }
}

async function captureDesktop(browser, port, tag) {
  for (const mode of MODES) {
    const page = await newDeterministicPage(browser, DESKTOP_VIEWPORT);
    await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
    await settle(page);
    await setDarkMode(page, { isPhoneWidth: false, wantDark: mode === 'dark' });

    for (const wp of WAYPOINTS) {
      await gotoSlide(page, wp.index);
      await settle(page);
      await shoot(page, path.join(OUT_DIR, `${DESKTOP_VIEWPORT.name}-${mode}-${wp.name}-${tag}.png`));
    }
    if (page.errors.length) console.error(`Errors desktop/${mode}:`, page.errors.map((e) => e.message));
    await page.close();
  }
}

async function main() {
  const tag = process.argv[2];
  if (!['before', 'after'].includes(tag)) {
    console.error('Usage: node mobile-readability.recipe.js <before|after>');
    process.exit(2);
  }

  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  try {
    await captureDesktop(browser, port, tag);
    await capturePhone(browser, port, tag);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  console.log(`Done: ${tag}. Output in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
