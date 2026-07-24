'use strict';

// LOTO player navigation helpers — reusable across M1/M2/M3 and future
// passes over this player (chrome/player.js + chrome/chrome.css). Talks to
// the actual global render functions the player already defines
// (currentSlide, renderSlide, renderClose, ...) rather than reimplementing
// any rendering logic here.

// waypoint: { type: 'slide', index } | { type: 'quiz' } | { type: 'close' }
async function gotoWaypoint(page, waypoint) {
  await page.evaluate((wp) => {
    if (wp.type === 'slide') {
      quizMode = false;
      currentSlide = wp.index;
      renderSlide();
    } else if (wp.type === 'quiz') {
      quizMode = true;
      currentQuizQuestion = 0;
      isAnswered = false;
      renderQuiz();
    } else if (wp.type === 'close') {
      // Mirrors the real end-state: nextSlide() calls renderClose() without
      // incrementing past the last question index, so currentQuizQuestion
      // stays at length-1 (matters for updateProgress()'s position math).
      quizMode = true;
      quizAnswers = MODULE.quiz.map((q) => q.correct);
      currentQuizQuestion = MODULE.quiz.length - 1;
      isAnswered = true;
      renderClose();
    }
    updateProgress();
    updateNavButtons();
  }, waypoint);
}

// Sets dark mode by clicking the real #darkToggleBtn wherever it currently
// lives (inline at desktop widths, inside the popover at phone widths) —
// this is the behavior under test, not a shortcut around it.
async function setDarkMode(page, { isPhoneWidth, wantDark }) {
  const btn = page.locator('#darkToggleBtn');
  const pressed = (await btn.getAttribute('aria-pressed')) === 'true';
  if (pressed === wantDark) return;
  if (isPhoneWidth) await page.locator('#moreBtn').click();
  await btn.click();
}

// Sets Reviewer/Learner mode by clicking the real #modeToggleBtn wherever
// it currently lives — same rationale as setDarkMode above.
async function setReviewerMode(page, { isPhoneWidth, wantReviewer }) {
  const btn = page.locator('#modeToggleBtn');
  const pressed = (await btn.getAttribute('aria-pressed')) === 'true';
  if (pressed === wantReviewer) return;
  if (isPhoneWidth) await page.locator('#moreBtn').click();
  await btn.click();
}

async function openMoreMenu(page) {
  await page.locator('#moreBtn').click();
}

// Closes via Escape rather than re-clicking #moreBtn — a second trigger
// click would also work (toggleMoreMenu flips state), but Escape is the
// path least entangled with the trigger's own toggle logic.
async function closeMoreMenu(page) {
  const isOpen = await page.locator('#moreMenu').evaluate((el) => el.classList.contains('open'));
  if (isOpen) await page.keyboard.press('Escape');
}

module.exports = { gotoWaypoint, setDarkMode, setReviewerMode, openMoreMenu, closeMoreMenu };
