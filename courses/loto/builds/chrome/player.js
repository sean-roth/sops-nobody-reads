/* LOTO shared player — renderer + behaviors, verbatim from the three
   self-contained players (chrome-consolidation refactor, 2026-07-21).

   Reads two globals defined inline by each module shell BEFORE this script:
     MODULE        — the module data (byte-equal to module-0N.json)
     MODULE_CHROME — the three per-module render fields that used to live
                     forked inside each player's render code:
                       feedbacks[]  — quiz explanations, by question index
                       nextHref     — close-screen "next" link target
                       nextLabel    — close-screen "next" link label
                       closeNote    — close-screen resting note

   nl2br() converts the real newlines that MODULE heading text carries into
   <br>. It was a pre-existing no-op until the NL2BR pass (2026-07-23) — the
   deck-wide fix the consolidation set up (courses/loto/CHANGE-NOTE-nl2br.md). */

// The player chrome DOM — identical across all three modules, injected into
// the shell's single #app mount so it lives in exactly one place.
const PLAYER_MARKUP = `
<div class="player" id="player">
  <div class="slide-container" id="slideContainer"></div>

  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <button class="nav-btn bar-more-btn" id="moreBtn" onclick="toggleMoreMenu()" aria-haspopup="true" aria-expanded="false" aria-controls="moreMenu" aria-label="View options">&#8943;</button>
      <div class="bar-more-menu" id="moreMenu">
        <button class="nav-btn" id="modeToggleBtn" onclick="toggleReviewerMode()" aria-pressed="false" title="Toggle citation view for review/compliance">Learner Mode</button>
        <button class="nav-btn" id="darkToggleBtn" onclick="toggleDarkMode()" aria-pressed="false" title="Toggle dark mode">Dark</button>
        <a href="../index.html" class="nav-btn bar-menu-link" onclick="closeMoreMenu()">Menu</a>
      </div>
    </div>
    <div class="progress-section">
      <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
      <span class="progress-text" id="progressText">1 / 1</span>
    </div>
    <div class="nav-buttons">
      <button class="nav-btn" id="prevBtn" disabled>&#8592; Prev</button>
      <button class="nav-btn" id="nextBtn">Next &#8594;</button>
    </div>
  </div>
</div>`;

function mountChrome() {
  document.getElementById('app').innerHTML = PLAYER_MARKUP;
}

let currentSlide = 0;
let quizAnswers = [];
let quizMode = false;
let currentQuizQuestion = 0;
let isAnswered = false;

// Reviewer mode and dark-mode are view state only, in-memory for this session.
// NOT persisted (no localStorage/sessionStorage) — this player gets packaged
// for SCORM/LMS delivery, and LMS iframe storage-partitioning makes browser
// storage unreliable inside an SCO (§S4 delivery-safe).
let reviewerMode = false;
let darkMode = false;

function toggleReviewerMode() {
  reviewerMode = !reviewerMode;
  const btn = document.getElementById('modeToggleBtn');
  btn.textContent = reviewerMode ? 'Reviewer Mode' : 'Learner Mode';
  btn.setAttribute('aria-pressed', String(reviewerMode));
  renderCurrent();
  closeMoreMenu({ returnFocus: true });
}

function toggleDarkMode() {
  darkMode = !darkMode;
  document.documentElement.classList.toggle('dark', darkMode);
  const btn = document.getElementById('darkToggleBtn');
  btn.textContent = darkMode ? 'Light' : 'Dark';
  btn.setAttribute('aria-pressed', String(darkMode));
  closeMoreMenu({ returnFocus: true });
}

// Bottom-bar "more" popover (phone widths only — at desktop #moreMenu sits
// empty and hidden, see arrangeBarControls() below and chrome.css). Trigger
// and menu are a plain disclosure, not a full ARIA menu widget: Tab moves
// through the popover's buttons in normal document order rather than a
// roving-tabindex/arrow-key pattern, since nothing here needs more than that.
function openMoreMenu() {
  document.getElementById('moreMenu').classList.add('open');
  document.getElementById('moreBtn').setAttribute('aria-expanded', 'true');
}

function closeMoreMenu(opts) {
  const returnFocus = !!(opts && opts.returnFocus);
  const menu = document.getElementById('moreMenu');
  if (!menu.classList.contains('open')) return;
  menu.classList.remove('open');
  const btn = document.getElementById('moreBtn');
  btn.setAttribute('aria-expanded', 'false');
  if (returnFocus) btn.focus();
}

function toggleMoreMenu() {
  const menu = document.getElementById('moreMenu');
  if (menu.classList.contains('open')) closeMoreMenu({ returnFocus: true });
  else openMoreMenu();
}

// Relocates the three controls between the inline bar (desktop) and the
// popover (phone widths) — not just a CSS visibility swap. `order` (or
// flex-direction: *-reverse) only changes paint position, never tab order,
// which always follows DOM order; a CSS-only reorder would make one of the
// two contexts tab in the wrong sequence. Physically moving the nodes keeps
// natural tab order correct in both, with zero explicit tabindex.
const PHONE_BAR_MQ = window.matchMedia('(max-width: 640px)');

function arrangeBarControls() {
  const left = document.querySelector('.bottom-bar-left');
  const moreMenu = document.getElementById('moreMenu');
  const learnerBtn = document.getElementById('modeToggleBtn');
  const darkBtn = document.getElementById('darkToggleBtn');
  const menuLink = document.querySelector('.bar-menu-link');

  if (PHONE_BAR_MQ.matches) {
    moreMenu.append(learnerBtn, darkBtn, menuLink); // popover order (brief): Learner, Dark, Menu
  } else {
    left.append(menuLink, darkBtn, learnerBtn); // desktop order (main, unchanged): Menu, Dark, Learner
    closeMoreMenu(); // in case a resize/rotation crossed the breakpoint while open
  }
}

PHONE_BAR_MQ.addEventListener('change', arrangeBarControls);

function renderCurrent() {
  if (quizMode) { renderQuiz(); } else { renderSlide(); }
}

// Citation chip (Reviewer mode). Fail-safe: never renders a partial or
// fabricated citation — citation and url are both required (Build Methodology §M3).
function renderCitation(source) {
  if (!reviewerMode || !source || !source.citation || !source.url) return '';
  return `<a class="citation-chip" href="${source.url}" target="_blank" rel="noopener"><span>&sect;</span> ${source.citation}</a>`;
}

// nl2br — MODULE headings carry real newline characters; render each as a <br>.
// slide.heading is the sole consumer (title, teaching-caption, misconception-held-up,
// reveal). The pre-2026-07-23 pattern matched a literal backslash-n sequence, which
// the parsed data never contains, so it silently no-op'd (the NL2BR-PASS bug).
function nl2br(s) { return (s || '').replace(/\n/g, '<br>'); }

// sequence shape — split items into rows of 3, but never leave a lone
// trailing item (3+3+1 reads as an orphan): fold it back into the row
// before, so 7 items lay out 3+4, 4 lays out as one row of 4, etc.
function seqRows(items) {
  const n = items.length;
  const full = Math.floor(n / 3);
  const rem = n % 3;
  const rowSizes = new Array(full).fill(3);
  if (rem === 1 && rowSizes.length > 0) rowSizes[rowSizes.length - 1] += 1;
  else if (rem > 0) rowSizes.push(rem);
  const rows = [];
  let idx = 0;
  for (const size of rowSizes) { rows.push(items.slice(idx, idx + size)); idx += size; }
  return rows;
}

function initPlayer() {
  renderSlide();
  updateProgress();
  updateNavButtons();
}

function renderSlide() {
  const container = document.getElementById('slideContainer');
  const slide = MODULE.slides[currentSlide];
  if (!slide) return;

  let inner = '';
  let slideClasses = `slide slide-${slide.type}`;
  if (slide.shape) slideClasses += ` shape-${slide.shape}`;
  if (slide.image) slideClasses += ' has-image';
  const bgStyle = slide.image ? `background-image: url('${slide.image}')` : '';

  switch (slide.type) {
    case 'title':
      inner = `
        <div class="module-label">${slide.moduleLabel}</div>
        <h1>${nl2br(slide.heading)}</h1>
        <div class="subtitle">${slide.subtitle}</div>
        <div class="brand">${slide.brand}</div>
      `;
      break;

    case 'scene':
      inner = `
        <div class="scene-label">${slide.label}</div>
        <p>${slide.text}</p>
      `;
      break;

    case 'callback':
      inner = `
        <div class="callback-label">${slide.label}</div>
        <p>${slide.text}</p>
      `;
      break;

    case 'teaching-caption':
      if (slide.shape === 'figure') {
        inner = `
          ${slide.kicker ? `<div class="kicker">${slide.kicker}</div>` : ''}
          <div class="figure-value">${slide.figure}</div>
          <div class="figure-caption">${nl2br(slide.heading)}</div>
          <div class="body">${slide.body}</div>
        `;
      } else {
        inner = `
          ${slide.kicker ? `<div class="kicker">${slide.kicker}</div>` : ''}
          <h2>${nl2br(slide.heading)}</h2>
          <div class="body">${slide.body}</div>
        `;
      }
      break;

    case 'misconception-held-up':
      inner = `
        <div class="misconception-frame">${slide.kicker || 'Where people start'}</div>
        <div class="misconception-quote">&ldquo;${nl2br(slide.heading)}&rdquo;</div>
        ${slide.body ? `<div class="misconception-body">${slide.body}</div>` : ''}
      `;
      break;

    case 'reveal':
      inner = `
        <div class="kicker">${slide.kicker}</div>
        <h2>${nl2br(slide.heading)}</h2>
        <div class="body">${slide.body}</div>
      `;
      break;

    case 'definition':
      inner = `
        <div class="definition-label">${slide.label}</div>
        <div class="definition-box"><div class="box-text">${slide.boxText}</div></div>
        <div class="body">${slide.body}</div>
      `;
      break;

    case 'consolidation': {
      const isList = Array.isArray(slide.items) && slide.items.length > 0 && typeof slide.items[0] === 'object';
      const isSequence = isList && slide.shape === 'sequence';
      const body = isSequence
        ? `<div class="consolidation-sequence">${seqRows(slide.items).map(row => `
            <div class="seq-row" style="grid-template-columns: repeat(${row.length}, minmax(0, 1fr));">
              ${row.map(it => `<div class="seq-step"><span class="seq-num">${it.num}</span><span class="seq-text">${it.text}</span></div>`).join('')}
            </div>
          `).join('')}</div>`
        : isList
        ? `<ol class="consolidation-list">${slide.items.map(it => `
            <li class="c-item"><span class="c-num">${it.num}</span><span class="c-text">${it.text}</span></li>
          `).join('')}</ol>`
        : `<div class="consolidation-grid">${slide.items.map(it => `<div class="c-item">${it}</div>`).join('')}</div>`;
      inner = `
        ${slide.label ? `<div class="consolidation-label">${slide.label}</div>` : ''}
        <h2>${slide.heading}</h2>
        ${body}
      `;
      break;
    }

    case 'options': {
      const opts = slide.options.map(o => `
        <div class="option ${slide.highlighted === o.letter ? 'highlighted' : ''}">
          <div class="option-letter">${o.letter}</div>
          <div class="option-content"><h3>${o.title}</h3><p>${o.desc}</p></div>
        </div>
      `).join('');
      inner = `<h2>${slide.heading}</h2><div class="options-container">${opts}</div>`;
      break;
    }
  }

  inner += renderCitation(slide.source);
  container.innerHTML = `<div class="${slideClasses}" style="${bgStyle}">${inner}</div>`;
  requestAnimationFrame(() => {
    const el = container.querySelector('.slide');
    if (el) el.classList.add('active');
  });
}

function renderQuiz() {
  const container = document.getElementById('slideContainer');

  if (currentQuizQuestion >= MODULE.quiz.length) { renderClose(); return; }

  const q = MODULE.quiz[currentQuizQuestion];
  const options = q.options.map((option, index) => {
    const letter = String.fromCharCode(65 + index);
    let cls = 'quiz-option';
    if (isAnswered) {
      if (index === q.correct) cls += ' correct';
      else if (quizAnswers[currentQuizQuestion] === index) cls += ' incorrect';
    } else if (quizAnswers[currentQuizQuestion] === index) {
      cls += ' selected';
    }
    return `
      <div class="${cls}" onclick="${!isAnswered ? `selectAnswer(${index})` : ''}">
        <div class="option-letter">${letter}</div>
        <div class="option-text">${option}</div>
      </div>
    `;
  }).join('');

  let feedback = '';
  if (isAnswered) {
    const isCorrect = quizAnswers[currentQuizQuestion] === q.correct;
    feedback = `<div class="quiz-feedback">${isCorrect ? 'Correct.' : 'Incorrect.'} ${getQuizFeedback(currentQuizQuestion)}</div>`;
  }

  const html = `
    <div class="slide slide-quiz active">
      <div class="quiz-container">
        <h2>Question ${currentQuizQuestion + 1} of ${MODULE.quiz.length}</h2>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">${options}</div>
        ${feedback}
        ${renderCitation(q.source)}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function selectAnswer(answerIndex) {
  if (isAnswered) return;
  quizAnswers[currentQuizQuestion] = answerIndex;
  isAnswered = true;
  renderQuiz();
  updateNavButtons();
}

function getQuizFeedback(questionIndex) {
  const feedbacks = MODULE_CHROME.feedbacks || [];
  return feedbacks[questionIndex] || '';
}

// close — was "results". The module's resting note (§S3).
function renderClose() {
  const container = document.getElementById('slideContainer');
  const correctAnswers = quizAnswers.filter((a, i) => a === MODULE.quiz[i].correct).length;
  const totalQuestions = MODULE.quiz.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= MODULE.passingScore;

  const html = `
    <div class="slide slide-close active">
      <div class="close-container">
        <h2>Module ${MODULE.moduleNumber} Complete</h2>
        <div class="close-score ${passed ? 'pass' : 'fail'}">${percentage}%</div>
        <div class="close-message">
          ${correctAnswers} of ${totalQuestions} questions correct<br>
          ${passed ? 'You passed. Well done.' : `You need ${MODULE.passingScore}% to pass. Please review the material and try again.`}
        </div>
        <div class="close-actions">
          ${!passed ? '<button class="nav-btn" onclick="restartQuiz()">Try Again</button>' : ''}
          <a href="${MODULE_CHROME.nextHref}" class="nav-btn">${MODULE_CHROME.nextLabel}</a>
        </div>
        <p class="close-note">${MODULE_CHROME.closeNote}</p>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function restartQuiz() {
  quizAnswers = [];
  currentQuizQuestion = 0;
  isAnswered = false;
  renderQuiz();
  updateNavButtons();
}

function nextSlide() {
  if (quizMode) {
    if (isAnswered) {
      if (currentQuizQuestion < MODULE.quiz.length - 1) {
        currentQuizQuestion++;
        isAnswered = false;
        renderQuiz();
      } else {
        renderClose();
      }
    }
  } else if (currentSlide < MODULE.slides.length - 1) {
    currentSlide++;
    renderSlide();
  } else {
    quizMode = true;
    currentQuizQuestion = 0;
    isAnswered = false;
    renderQuiz();
  }
  updateProgress();
  updateNavButtons();
}

function prevSlide() {
  if (quizMode && currentQuizQuestion === 0) {
    quizMode = false;
    currentSlide = MODULE.slides.length - 1;
    renderSlide();
  } else if (quizMode) {
    currentQuizQuestion--;
    isAnswered = quizAnswers[currentQuizQuestion] !== undefined;
    renderQuiz();
  } else if (currentSlide > 0) {
    currentSlide--;
    renderSlide();
  }
  updateProgress();
  updateNavButtons();
}

function updateProgress() {
  const total = MODULE.slides.length + MODULE.quiz.length;
  const pos = quizMode ? MODULE.slides.length + currentQuizQuestion + 1 : currentSlide + 1;
  document.getElementById('progressFill').style.width = `${(pos / total) * 100}%`;
  document.getElementById('progressText').textContent = `${pos} / ${total}`;
  document.getElementById('slideContainer').scrollTop = 0; // MOBILE-READABILITY-2026-07-23: every slide change starts scrolled to top
}

function updateNavButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  prevBtn.disabled = !quizMode && currentSlide === 0;

  if (quizMode) {
    nextBtn.disabled = !isAnswered;
    nextBtn.textContent = (currentQuizQuestion >= MODULE.quiz.length - 1 && isAnswered) ? 'Results ►' : 'Next ►';
  } else {
    nextBtn.disabled = false;
    nextBtn.textContent = (currentSlide === MODULE.slides.length - 1) ? 'Quiz ►' : 'Next ►';
  }
}

mountChrome();
arrangeBarControls();

document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) nextSlide();
  else if (e.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) prevSlide();
  else if (e.key === 'Escape') closeMoreMenu({ returnFocus: true });
});

// Outside tap/click closes the popover. No returnFocus here — an outside
// click should let focus follow whatever the user actually clicked, not get
// yanked back to the trigger.
document.addEventListener('click', (e) => {
  const menu = document.getElementById('moreMenu');
  const btn = document.getElementById('moreBtn');
  if (!menu.classList.contains('open')) return;
  if (menu.contains(e.target) || btn.contains(e.target)) return;
  closeMoreMenu();
});

initPlayer();

// SCORM API stubs (graceful degradation) — the player never touches SCORM/LMS
// calls or completion/score tracking beyond this; runs standalone, in an
// iframe, or as a SCORM package identically (§S4 delivery-safe).
window.API = window.API || {
  LMSInitialize: () => 'true',
  LMSCommit: () => 'true',
  LMSFinish: () => 'true',
  LMSGetValue: () => '',
  LMSSetValue: () => 'true',
  LMSGetLastError: () => '0',
  LMSGetErrorString: () => '',
  LMSGetDiagnostic: () => ''
};
