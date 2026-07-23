'use strict';

// Self-check for MOBILE-READABILITY-2026-07-23: R2 (DOM order drives the
// 2-col reading order, not hopeful CSS) and R5 (scroll resets on slide
// change; quiz/close unaffected). R3/R4 are covered by overflow-audit.js
// and diff.js respectively.

const path = require('path');
const { chromium } = require('playwright');
const { serveDir, newDeterministicPage, settle } = require('./lib');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BUILDS_DIR = path.join(REPO_ROOT, 'courses', 'loto', 'builds');

async function main() {
  const { server, port } = await serveDir(BUILDS_DIR);
  const browser = await chromium.launch();
  const page = await newDeterministicPage(browser, { width: 360, height: 800 });
  await page.goto(`http://127.0.0.1:${port}/module-01/index.html`);
  await settle(page);
  // Scroll-reset needs a waypoint that genuinely overflows post-fix. M1's
  // fixed slides no longer do at this viewport (that's the point) — use the
  // one residual case from the overflow audit: module-03 slide-7 at a
  // reduced (browser-chrome-simulated) height, which the fix leaves
  // clipped-but-scrollable by design.

  const r = {};

  // R2: DOM order of .seq-step is 1..6, and grid auto-placement (2 cols)
  // puts them at row-major positions matching 1.2/3.4/5.6.
  await page.evaluate(() => { quizMode = false; currentSlide = 19; renderSlide(); });
  await settle(page);
  const seq = await page.evaluate(() => {
    const steps = Array.from(document.querySelectorAll('.seq-step'));
    const nums = steps.map((s) => s.querySelector('.seq-num').textContent.trim());
    const boxes = steps.map((s) => s.getBoundingClientRect());
    // column: which x-band each step falls in (left col vs right col)
    const cols = boxes.map((b) => (b.left < boxes[0].left + boxes[0].width ? 'depends' : 'x'));
    return {
      domOrderNums: nums,
      positions: boxes.map((b) => ({ x: Math.round(b.left), y: Math.round(b.top) })),
    };
  });
  r.seqDomOrder = seq.domOrderNums;
  r.seqDomOrderCorrect = JSON.stringify(seq.domOrderNums) === JSON.stringify(['1.', '2.', '3.', '4.', '5.', '6.']);
  // Row-major 2-col: items 0,1 share a row (same y, different x); 2,3 share the next row; 4,5 the last.
  const p = seq.positions;
  r.readingOrderRowMajor =
    p[0].y === p[1].y && p[0].x < p[1].x &&
    p[2].y === p[3].y && p[2].x < p[3].x &&
    p[4].y === p[5].y && p[4].x < p[5].x &&
    p[2].y > p[0].y && p[4].y > p[2].y;

  // R5: scroll position resets on slide change. Needs a waypoint that
  // genuinely overflows post-fix — M1's fixed slides no longer do at
  // normal dimensions (that's the point of the fix) — so use module-03's
  // still-dense slide-7 at a reduced height (the one residual case the
  // overflow audit left clipped-but-scrollable by design).
  const stressPage = await newDeterministicPage(browser, { width: 360, height: 660 });
  await stressPage.goto(`http://127.0.0.1:${port}/module-03/index.html`);
  await settle(stressPage);
  await stressPage.evaluate(() => { quizMode = false; currentSlide = 6; renderSlide(); updateProgress(); });
  await settle(stressPage);
  const overflowsForTest = await stressPage.evaluate(() => {
    const c = document.getElementById('slideContainer');
    return c.scrollHeight > c.clientHeight + 1;
  });
  await stressPage.evaluate(() => { document.getElementById('slideContainer').scrollTop = 20; });
  const scrollBefore = await stressPage.evaluate(() => document.getElementById('slideContainer').scrollTop);
  await stressPage.evaluate(() => { nextSlide(); }); // goes through updateProgress()
  const scrollAfterNext = await stressPage.evaluate(() => document.getElementById('slideContainer').scrollTop);
  r.scrollTestWaypointOverflows = overflowsForTest;
  r.scrollWasSet = scrollBefore > 0;
  r.scrollResetOnNext = scrollAfterNext === 0;
  await stressPage.close();

  // R5: quiz/close aren't spuriously scrollable (no clipping = no unwanted overflow behavior change).
  await page.evaluate(() => { quizMode = true; currentQuizQuestion = 0; isAnswered = false; renderQuiz(); updateProgress(); });
  await settle(page);
  r.quizNotClipped = await page.evaluate(() => {
    const c = document.getElementById('slideContainer');
    return c.scrollHeight <= c.clientHeight + 1;
  });
  await page.evaluate(() => {
    quizAnswers = MODULE.quiz.map((q) => q.correct);
    currentQuizQuestion = MODULE.quiz.length - 1;
    isAnswered = true;
    renderClose();
    updateProgress();
  });
  await settle(page);
  r.closeNotClipped = await page.evaluate(() => {
    const c = document.getElementById('slideContainer');
    return c.scrollHeight <= c.clientHeight + 1;
  });

  r.pageErrors = page.errors.map((e) => e.message);

  const pass =
    r.seqDomOrderCorrect && r.readingOrderRowMajor &&
    r.scrollTestWaypointOverflows && r.scrollWasSet && r.scrollResetOnNext &&
    r.quizNotClipped && r.closeNotClipped &&
    r.pageErrors.length === 0;

  console.log(JSON.stringify(r, null, 2));
  console.log(pass ? 'PASS' : 'FAIL');

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  process.exit(pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
