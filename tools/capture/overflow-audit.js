'use strict';

// Programmatic overflow audit (MOBILE-READABILITY-2026-07-23). For every
// waypoint (slide index / quiz question / close) x viewport x mode across
// M1/M2/M3, measures whether content overflows `#slideContainer` and, when
// it does, whether scrolling to the bottom actually reveals the last
// content node — proves the backstop works rather than assuming it.
//
// Usage: node overflow-audit.js <output.json>
// Run once against the pre-fix checkout, once post-fix; combine the two
// with overflow-report.js into the before/after table.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle } = require('./lib');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');

// Nominal dimensions per the brief, plus a disclosed supplementary stress
// pair: at the exact nominal heights, slide 20's reported vertical clipping
// doesn't reproduce in headless Chromium (measured margin ~30-60px) — real
// mobile browsers typically show less effective height than the nominal
// device size once address-bar/toolbar chrome is accounted for. The
// reduced-height pair actually exercises the fix's margins instead of
// testing at dimensions where the original bug is already borderline-gone.
const VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
  { name: '390x704-chrome', width: 390, height: 704 },
  { name: '360x660-chrome', width: 360, height: 660 },
];
const MODES = ['light', 'dark'];

// Slide/quiz counts read from each module-0N.json (slides.length, quiz.length).
const MODULES = {
  'module-01': { slides: 25, quiz: 4 },
  'module-02': { slides: 22, quiz: 4 },
  'module-03': { slides: 30, quiz: 4 },
};

function waypointsFor(counts) {
  const wps = [];
  for (let i = 0; i < counts.slides; i++) wps.push({ name: `slide-${i + 1}`, type: 'slide', index: i });
  for (let i = 0; i < counts.quiz; i++) wps.push({ name: `quiz-${i + 1}`, type: 'quiz-question', index: i });
  wps.push({ name: 'close', type: 'close' });
  return wps;
}

async function gotoWaypoint(page, wp) {
  await page.evaluate((wp) => {
    if (wp.type === 'slide') {
      quizMode = false;
      currentSlide = wp.index;
      renderSlide();
    } else if (wp.type === 'quiz-question') {
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
  }, wp);
}

async function measure(page) {
  return page.evaluate(() => {
    const container = document.getElementById('slideContainer');
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const clippedV = scrollHeight > clientHeight + 1;
    // Horizontal overflow matters too — found on slide 25 during planning:
    // consolidation-grid's auto-fit sized itself to max-width instead of the
    // flex parent's actual width (align-items:center doesn't stretch/
    // constrain it), centering an oversized grid so items spilled off both
    // edges. A vertical-scroll backstop does nothing for that; it has to be
    // fixed at the source, and this check is what would catch it if it
    // recurred somewhere else.
    const clippedH = scrollWidth > clientWidth + 1;
    const clipped = clippedV || clippedH;

    let scrollWorks = !clippedV; // vertical backstop only; horizontal overflow has no scroll fallback
    if (clippedV) {
      container.scrollTop = container.scrollHeight;
      const nodes = container.querySelectorAll('*');
      const last = nodes[nodes.length - 1];
      const lastBox = last.getBoundingClientRect();
      const containerBox = container.getBoundingClientRect();
      scrollWorks = lastBox.bottom <= containerBox.bottom + 1;
      container.scrollTop = 0;
    }
    return { scrollHeight, clientHeight, scrollWidth, clientWidth, clippedV, clippedH, clipped, scrollWorks };
  });
}

async function auditModule(browser, port, moduleName, counts) {
  const waypoints = waypointsFor(counts);
  const results = [];
  for (const viewport of VIEWPORTS) {
    for (const mode of MODES) {
      const page = await newDeterministicPage(browser, viewport);
      await page.goto(`http://127.0.0.1:${port}/${moduleName}/index.html`);
      await settle(page);
      if (mode === 'dark') {
        await page.evaluate(() => {
          darkMode = true;
          document.documentElement.classList.add('dark');
        });
      }

      for (const wp of waypoints) {
        await gotoWaypoint(page, wp);
        await settle(page);
        const m = await measure(page);
        results.push({ module: moduleName, viewport: viewport.name, mode, waypoint: wp.name, ...m });
      }
      if (page.errors.length) {
        console.error(`Errors ${moduleName}/${viewport.name}/${mode}:`, page.errors.map((e) => e.message));
      }
      await page.close();
    }
  }
  return results;
}

async function main() {
  const outPath = process.argv[2];
  if (!outPath) {
    console.error('Usage: node overflow-audit.js <output.json>');
    process.exit(2);
  }

  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  const all = [];
  try {
    for (const [moduleName, counts] of Object.entries(MODULES)) {
      all.push(...(await auditModule(browser, port, moduleName, counts)));
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  const clippedCount = all.filter((r) => r.clipped).length;
  const stuckCount = all.filter((r) => r.clipped && !r.scrollWorks).length;
  console.log(`${all.length} checks, ${clippedCount} clipped, ${stuckCount} clipped-and-unscrollable. Written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
