'use strict';

// Capture recipe for DEMO-POLISH-2026-07-24. Run with:
//   node demo-polish.recipe.js before       (pre-fix — stash chrome.css first)
//   node demo-polish.recipe.js after        (post-fix, shipped default)
//   node demo-polish.recipe.js contrast     (AA composite-contrast report, current tree)
//   node demo-polish.recipe.js alt-scrim    (item 2 alternate (a), evidence only)
//   node demo-polish.recipe.js alt-shadow   (item 2 alternate (b), evidence only)
//
// Item 1 (citation chip): module-01 slide 7 (has-image+source) and slide 6
// (plain+source), Reviewer mode on, desktop 1440 + phone 390, both modes.
// Item 2 (scene panel): module-01 slide 2 (the gate — busiest/maintenance-
// scene art) + module-03 slides 1/9 (has-image scene, read-only supporting
// sweep — chrome.css is shared verbatim, so the fix reaches them for free).

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle, shoot } = require('./lib');
const { setDarkMode, setReviewerMode } = require('./loto-player');
const { measureContrast } = require('./contrast-check');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');
const OUT_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'screenshots', 'demo-polish');

const DESKTOP = { name: '1440x900', width: 1440, height: 900 };
const PHONE = { name: '390x844', width: 390, height: 844 };
const VIEWPORTS = [DESKTOP, PHONE];
const MODES = ['light', 'dark'];

const CHIP_WAYPOINTS = [
  { name: 'slide7-image', index: 7 },
  { name: 'slide6-plain', index: 6 },
];
const SCENE_GATE = { module: 'module-01', name: 'slide2-target', index: 2 };
const SCENE_SWEEP = [
  { module: 'module-03', name: 'slide1', index: 1 },
  { module: 'module-03', name: 'slide9', index: 9 },
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

async function captureChip(browser, port, tag) {
  for (const viewport of VIEWPORTS) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, viewport);
      await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
      await settle(page);
      const isPhoneWidth = viewport.name === PHONE.name;
      await setDarkMode(page, { isPhoneWidth, wantDark: mode === 'dark' });
      await setReviewerMode(page, { isPhoneWidth, wantReviewer: true });
      for (const wp of CHIP_WAYPOINTS) {
        await gotoSlide(page, wp.index);
        await settle(page);
        await shoot(page, path.join(OUT_DIR, 'chip', `${viewport.name}-${mode}-${wp.name}-${tag}.png`));
        const rects = await page.evaluate(() => {
          const chip = document.querySelector('.citation-chip');
          const slide = document.querySelector('.slide');
          return chip && slide
            ? { chip: chip.getBoundingClientRect().toJSON(), slide: slide.getBoundingClientRect().toJSON() }
            : null;
        });
        console.log(`chip ${viewport.name}/${mode}/${wp.name}/${tag}:`, JSON.stringify(rects));
      }
      if (page.errors.length) console.error(`Errors ${viewport.name}/${mode}:`, page.errors.map((e) => e.message));
      await page.close();
    }
  }
}

async function captureScene(browser, port, tag) {
  const all = [SCENE_GATE, ...SCENE_SWEEP];
  for (const viewport of VIEWPORTS) {
    for (const mode of MODES) {
      for (const wp of all) {
        const page = await newDeterministicPage(browser, viewport);
        await page.goto(`http://127.0.0.1:${port}/${wp.module}/index.html`);
        await settle(page);
        const isPhoneWidth = viewport.name === PHONE.name;
        await setDarkMode(page, { isPhoneWidth, wantDark: mode === 'dark' });
        await gotoSlide(page, wp.index);
        await settle(page);
        await shoot(page, path.join(OUT_DIR, 'scene', `${wp.module}-${viewport.name}-${mode}-${wp.name}-${tag}.png`));
        if (page.errors.length) {
          console.error(`Errors ${wp.module}/${viewport.name}/${mode}:`, page.errors.map((e) => e.message));
        }
        await page.close();
      }
    }
  }
}

async function runContrast(browser, port) {
  const results = [];
  for (const viewport of VIEWPORTS) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, viewport);
      await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
      await settle(page);
      await setDarkMode(page, { isPhoneWidth: viewport.name === PHONE.name, wantDark: mode === 'dark' });
      await gotoSlide(page, SCENE_GATE.index);
      await settle(page);
      for (const sel of ['.slide-scene p', '.slide-scene .scene-label']) {
        const r = await measureContrast(page, sel);
        results.push({ viewport: viewport.name, mode, ...r });
      }
      await page.close();
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'contrast-report.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  const allPass = results.every((r) => r.pass);
  console.log(allPass ? 'CONTRAST: ALL PASS' : 'CONTRAST: FAIL');
  return allPass;
}

// Alternates (a)/(b) — evidence only, never shipped. Neutralizes the
// shipped default via !important overrides injected at capture time, so
// this works regardless of what's on disk; chrome.css itself is untouched.
const ALT_CSS = {
  'alt-scrim': `
    .slide.has-image.slide-scene p {
      background: none !important; border: none !important;
      padding: 0 !important; backdrop-filter: none !important;
    }
    .slide.has-image.slide-scene::after {
      content: '';
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(180deg, transparent 0%, rgba(8,11,9,0.78) 30%, rgba(8,11,9,0.78) 70%, transparent 100%);
    }
  `,
  'alt-shadow': `
    .slide.has-image.slide-scene p {
      background: none !important; border: none !important;
      padding: 0 !important; backdrop-filter: none !important;
      text-shadow: 0 1px 3px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.6);
    }
    .slide.has-image.slide-scene .scene-label {
      text-shadow: 0 1px 3px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.8);
    }
  `,
};

async function captureAlt(browser, port, altName) {
  for (const viewport of VIEWPORTS) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, viewport);
      await page.goto(`http://127.0.0.1:${port}/${SCENE_GATE.module}/index.html`);
      await settle(page);
      await page.addStyleTag({ content: ALT_CSS[altName] });
      await setDarkMode(page, { isPhoneWidth: viewport.name === PHONE.name, wantDark: mode === 'dark' });
      await gotoSlide(page, SCENE_GATE.index);
      await settle(page);
      await shoot(page, path.join(OUT_DIR, 'scene', `${SCENE_GATE.module}-${viewport.name}-${mode}-${SCENE_GATE.name}-${altName}.png`));
      await page.close();
    }
  }
}

// Full-deck desktop sweep, all three modules — the regression gate. Prior
// passes learned (T6, PR #80) that a sampled gate can miss a real
// regression a full matrix catches; no sampling here.
const DECK_COUNTS = {
  'module-01': { slides: 25, quiz: 4 },
  'module-02': { slides: 22, quiz: 4 },
  'module-03': { slides: 30, quiz: 4 },
};

function deckWaypoints(counts) {
  const wps = [];
  for (let i = 0; i < counts.slides; i++) wps.push({ name: `slide-${i + 1}`, type: 'slide', index: i });
  for (let i = 0; i < counts.quiz; i++) wps.push({ name: `quiz-${i + 1}`, type: 'quiz', index: i });
  wps.push({ name: 'close', type: 'close' });
  return wps;
}

async function gotoDeckWaypoint(page, wp) {
  await page.evaluate((wp) => {
    if (wp.type === 'slide') {
      quizMode = false;
      currentSlide = wp.index;
      renderSlide();
    } else if (wp.type === 'quiz') {
      quizMode = true;
      currentQuizQuestion = wp.index;
      isAnswered = false;
      renderQuiz();
    } else if (wp.type === 'close') {
      quizMode = true;
      quizAnswers = MODULE.quiz.map((q) => q.correct);
      currentQuizQuestion = MODULE.quiz.length - 1;
      isAnswered = true;
      renderClose();
    }
    updateProgress();
    updateNavButtons();
  }, wp);
}

async function captureFullDeck(browser, port, tag) {
  for (const [mod, counts] of Object.entries(DECK_COUNTS)) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, DESKTOP);
      await page.goto(`http://127.0.0.1:${port}/${mod}/index.html`);
      await settle(page);
      await setDarkMode(page, { isPhoneWidth: false, wantDark: mode === 'dark' });
      for (const wp of deckWaypoints(counts)) {
        await gotoDeckWaypoint(page, wp);
        await settle(page);
        await shoot(page, path.join(OUT_DIR, 'full-deck', `${mod}-${DESKTOP.name}-${mode}-${wp.name}-${tag}.png`));
      }
      if (page.errors.length) console.error(`Errors ${mod}/${mode}:`, page.errors.map((e) => e.message));
      await page.close();
    }
  }
}

async function main() {
  const tag = process.argv[2];
  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  try {
    if (tag === 'before' || tag === 'after') {
      await captureChip(browser, port, tag);
      await captureScene(browser, port, tag);
    } else if (tag === 'full-deck-before' || tag === 'full-deck-after') {
      await captureFullDeck(browser, port, tag === 'full-deck-before' ? 'before' : 'after');
    } else if (tag === 'contrast') {
      const pass = await runContrast(browser, port);
      process.exitCode = pass ? 0 : 1;
    } else if (ALT_CSS[tag]) {
      await captureAlt(browser, port, tag);
    } else {
      console.error('Usage: node demo-polish.recipe.js <before|after|full-deck-before|full-deck-after|contrast|alt-scrim|alt-shadow>');
      process.exitCode = 2;
      return;
    }
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
