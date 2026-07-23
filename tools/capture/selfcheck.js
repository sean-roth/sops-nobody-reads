'use strict';

// Programmatic self-check for MOBILE-NAV-2026-07-23 (B2/B3 from the brief's
// audit checklist). Screenshots prove visual layout; this proves the
// numbers (target sizes, no horizontal scroll) and the popover's behavior
// contract (exact contents, order, aria state, focus, close triggers).

const path = require('path');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle } = require('./lib');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');
const PHONE_VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];

async function checkViewport(browser, port, viewport) {
  const page = await newDeterministicPage(browser, viewport);
  await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
  await settle(page);

  const r = { viewport: viewport.name };

  r.noHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);

  const sizes = {};
  for (const sel of ['#moreBtn', '#prevBtn', '#nextBtn']) {
    const box = await page.locator(sel).boundingBox();
    sizes[sel] = box && { w: Math.round(box.width), h: Math.round(box.height) };
  }
  r.barTargetSizes = sizes;
  r.barTargetsAtLeast44 = Object.values(sizes).every((b) => b && b.h >= 44 && b.w >= 44);

  // Open: exactly the 3 relocated controls, in the brief's order, aria-expanded true.
  await page.locator('#moreBtn').click();
  r.popoverChildIds = await page.locator('#moreMenu').evaluate((el) => Array.from(el.children).map((c) => c.id || c.className));
  r.ariaExpandedOnOpen = await page.locator('#moreBtn').getAttribute('aria-expanded');

  const popSizes = {};
  for (const sel of ['#modeToggleBtn', '#darkToggleBtn', '.bar-menu-link']) {
    const box = await page.locator(sel).boundingBox();
    popSizes[sel] = box && { w: Math.round(box.width), h: Math.round(box.height) };
  }
  r.popoverTargetSizes = popSizes;
  r.popoverTargetsAtLeast44 = Object.values(popSizes).every((b) => b && b.h >= 44);

  // Tab order inside the open popover: Learner -> Dark -> Menu (DOM order).
  await page.locator('#modeToggleBtn').focus();
  r.popTab0 = await page.evaluate(() => document.activeElement.id);
  await page.keyboard.press('Tab');
  r.popTab1 = await page.evaluate(() => document.activeElement.id);
  await page.keyboard.press('Tab');
  r.popTab2 = await page.evaluate(() => document.activeElement.className);

  // Esc closes + returns focus to trigger.
  await page.keyboard.press('Escape');
  r.closedOnEsc = await page.locator('#moreMenu').evaluate((el) => !el.classList.contains('open'));
  r.focusReturnedOnEsc = await page.evaluate(() => document.activeElement.id === 'moreBtn');
  r.ariaExpandedOnClose = await page.locator('#moreBtn').getAttribute('aria-expanded');

  // Outside click closes, without yanking focus to the trigger.
  await page.locator('#moreBtn').click();
  await page.locator('.slide').click({ position: { x: 5, y: 5 } });
  r.closedOnOutsideClick = await page.locator('#moreMenu').evaluate((el) => !el.classList.contains('open'));
  r.focusNotYankedOnOutsideClick = await page.evaluate(() => document.activeElement.id !== 'moreBtn');

  // Selecting Learner Mode closes the popover and aria-pressed tracks it.
  await page.locator('#moreBtn').click();
  const learnerPressedBefore = await page.locator('#modeToggleBtn').getAttribute('aria-pressed');
  await page.locator('#modeToggleBtn').click();
  r.learnerClosesOnSelect = await page.locator('#moreMenu').evaluate((el) => !el.classList.contains('open'));
  await page.locator('#moreBtn').click();
  const learnerPressedAfter = await page.locator('#modeToggleBtn').getAttribute('aria-pressed');
  r.learnerAriaPressedToggled = learnerPressedBefore !== learnerPressedAfter;

  // Selecting Dark closes the popover and aria-pressed tracks it.
  const darkPressedBefore = await page.locator('#darkToggleBtn').getAttribute('aria-pressed');
  await page.locator('#darkToggleBtn').click();
  r.darkClosesOnSelect = await page.locator('#moreMenu').evaluate((el) => !el.classList.contains('open'));
  await page.locator('#moreBtn').click();
  const darkPressedAfter = await page.locator('#darkToggleBtn').getAttribute('aria-pressed');
  r.darkAriaPressedToggled = darkPressedBefore !== darkPressedAfter;

  r.pageErrors = page.errors.map((e) => e.message);

  await page.close();
  return r;
}

function isPass(r) {
  return (
    r.noHorizontalScroll &&
    r.barTargetsAtLeast44 &&
    JSON.stringify(r.popoverChildIds) === JSON.stringify(['modeToggleBtn', 'darkToggleBtn', 'nav-btn bar-menu-link']) &&
    r.ariaExpandedOnOpen === 'true' &&
    r.popoverTargetsAtLeast44 &&
    r.popTab0 === 'modeToggleBtn' && r.popTab1 === 'darkToggleBtn' && r.popTab2 === 'nav-btn bar-menu-link' &&
    r.closedOnEsc && r.focusReturnedOnEsc && r.ariaExpandedOnClose === 'false' &&
    r.closedOnOutsideClick && r.focusNotYankedOnOutsideClick &&
    r.learnerClosesOnSelect && r.learnerAriaPressedToggled &&
    r.darkClosesOnSelect && r.darkAriaPressedToggled &&
    r.pageErrors.length === 0
  );
}

async function main() {
  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  let allPass = true;
  try {
    for (const viewport of PHONE_VIEWPORTS) {
      const r = await checkViewport(browser, port, viewport);
      const pass = isPass(r);
      allPass = allPass && pass;
      console.log(JSON.stringify(r, null, 2));
      console.log(`${viewport.name}: ${pass ? 'PASS' : 'FAIL'}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  process.exit(allPass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
