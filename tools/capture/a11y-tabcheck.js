'use strict';

// Desktop tab-through + accessibility-tree check for the bottom-bar-left
// controls under `display: contents` (MOBILE-NAV-2026-07-23). Older engines
// used to drop `display: contents` children from the accessibility tree;
// current engines fixed this, but Sean's redirect was to verify it rather
// than assume it. getByRole() queries the real computed accessibility tree
// (the same one assistive tech reads), so a dropped node fails the .count()
// check below rather than just failing a visual check.

const path = require('path');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle } = require('./lib');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');

async function main() {
  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  const page = await newDeterministicPage(browser, { width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
  await settle(page);

  const menuLink = page.getByRole('link', { name: 'Menu' });
  const darkBtn = page.getByRole('button', { name: 'Dark' });
  const learnerBtn = page.getByRole('button', { name: 'Learner Mode' });

  const results = {};
  results.menuExposed = (await menuLink.count()) === 1 && (await menuLink.isVisible());
  results.darkExposed = (await darkBtn.count()) === 1 && (await darkBtn.isVisible());
  results.learnerExposed = (await learnerBtn.count()) === 1 && (await learnerBtn.isVisible());

  await menuLink.focus();
  results.tab0_focused = await page.evaluate(() => document.activeElement.textContent.trim());
  await page.keyboard.press('Tab');
  results.tab1_focused = await page.evaluate(() => document.activeElement.id);
  await page.keyboard.press('Tab');
  results.tab2_focused = await page.evaluate(() => document.activeElement.id);

  results.moreBtnHidden = await page.evaluate(() => getComputedStyle(document.getElementById('moreBtn')).display === 'none');

  const pass =
    results.menuExposed && results.darkExposed && results.learnerExposed &&
    results.tab0_focused === 'Menu' &&
    results.tab1_focused === 'darkToggleBtn' &&
    results.tab2_focused === 'modeToggleBtn' &&
    results.moreBtnHidden;

  console.log(JSON.stringify(results, null, 2));
  console.log(pass ? 'PASS' : 'FAIL');

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  process.exit(pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
