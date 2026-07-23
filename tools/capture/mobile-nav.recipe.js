'use strict';

// Capture recipe for MOBILE-NAV-2026-07-23. Run with:
//   node mobile-nav.recipe.js before   (pre-fix, desktop 1440 only)
//   node mobile-nav.recipe.js after    (post-fix, desktop 1440 only)
//   node mobile-nav.recipe.js phone    (post-fix, full phone matrix)
// then diff.js the before/after desktop pairs.

const path = require('path');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle, shoot } = require('./lib');
const { gotoWaypoint, setDarkMode, openMoreMenu, closeMoreMenu } = require('./loto-player');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');
const OUT_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'screenshots', 'mobile-nav');

const PHONE_VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];
const DESKTOP_VIEWPORT = { name: '1440x900', width: 1440, height: 900 };
const MODES = ['light', 'dark'];

// Slide index 12 (0-indexed, of 26) is module-01's "Off vs. Safe" reveal —
// near-centered in the deck and the module's central teaching point.
const WAYPOINTS = [
  { name: 'mid-teaching', type: 'slide', index: 12 },
  { name: 'quiz', type: 'quiz' },
  { name: 'close', type: 'close' },
];

function reportErrors(page, label) {
  if (page.errors.length) {
    console.error(`Page errors at ${label}:`);
    for (const err of page.errors) console.error('  ' + err.message);
  }
}

async function capturePhoneMatrix(browser, port) {
  for (const viewport of PHONE_VIEWPORTS) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, viewport);
      await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
      await settle(page);
      await setDarkMode(page, { isPhoneWidth: true, wantDark: mode === 'dark' });

      for (const wp of WAYPOINTS) {
        await gotoWaypoint(page, wp);
        await settle(page);
        // Closed state — required on every slide type (nav must be reachable everywhere).
        await shoot(page, path.join(OUT_DIR, `${viewport.name}-${mode}-${wp.name}-closed.png`));

        // Open state — sampled on mid-teaching only. The popover's own
        // appearance doesn't depend on slide content, so crossing it against
        // all three slide types would be redundant captures, not additional
        // evidence (disclosed in the change note rather than silently done).
        if (wp.name === 'mid-teaching') {
          await openMoreMenu(page);
          await settle(page);
          await shoot(page, path.join(OUT_DIR, `${viewport.name}-${mode}-${wp.name}-open.png`));
          await closeMoreMenu(page);
          await settle(page);
        }
      }
      reportErrors(page, `${viewport.name}/${mode}`);
      await page.close();
    }
  }
}

async function captureDesktop(browser, port, tag) {
  // Quiz omitted here — desktop chrome doesn't change with slide content,
  // and mid-teaching + close already cover the two distinct bottom-bar
  // contexts (mid-deck nav vs. the close screen's action row).
  const desktopWaypoints = WAYPOINTS.filter((wp) => wp.name !== 'quiz');
  for (const mode of MODES) {
    const page = await newDeterministicPage(browser, DESKTOP_VIEWPORT);
    await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
    await settle(page);
    await setDarkMode(page, { isPhoneWidth: false, wantDark: mode === 'dark' });

    for (const wp of desktopWaypoints) {
      await gotoWaypoint(page, wp);
      await settle(page);
      await shoot(page, path.join(OUT_DIR, `${DESKTOP_VIEWPORT.name}-${mode}-${wp.name}-${tag}.png`));
    }
    reportErrors(page, `desktop/${mode}`);
    await page.close();
  }
}

async function main() {
  const mode = process.argv[2];
  if (!['before', 'after', 'phone'].includes(mode)) {
    console.error('Usage: node mobile-nav.recipe.js <before|after|phone>');
    process.exit(2);
  }

  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  try {
    if (mode === 'phone') await capturePhoneMatrix(browser, port);
    else await captureDesktop(browser, port, mode);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  console.log(`Done: ${mode}. Output in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
