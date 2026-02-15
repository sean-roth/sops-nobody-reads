# Slide Type Layouts

CSS layout specification for each slide type. These layouts are theme-agnostic — they define structure, not color or typography. Themes apply color/font through CSS custom properties.

## Universal Slide Properties

```css
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4vh 8vw;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}
.slide.active {
  opacity: 1;
  pointer-events: auto;
}
```

All slides are stacked and transitioned via opacity. The `active` class controls visibility. Padding uses viewport units for proportional scaling.

## Title Slide

```css
.slide-title {
  text-align: center;
  background: linear-gradient(170deg, var(--bg-warm) 0%, var(--bg-dark) 100%);
}
```

**Elements:** module-label (kicker) → h1 (heading) → subtitle → brand (absolute bottom)  
**Heading:** `clamp(2rem, 5vw, 4.5rem)`, font-weight 900, `--font-display`  
**Module label:** `--font-ui`, uppercase, letter-spacing 0.3em, `--gold`  
**Subtitle:** `--font-body`, italic, weight 300, `--cream-dim`  
**Brand:** absolute positioned bottom, `--font-ui`, 0.7rem, `--gold-dim`

## Scene Slide

```css
.slide-scene {
  text-align: center;
  background: linear-gradient(170deg, #1e1c17 0%, var(--bg-dark) 100%);
}
```

**Elements:** scene-label (kicker) → scene-text  
**Scene text:** `clamp(1.4rem, 3vw, 2.8rem)`, `--font-display`, italic, weight 400, max-width 42ch  
**Scene label:** `--font-ui`, uppercase, letter-spacing 0.3em, `--rust`  
**`<em>` inside scene text:** `--rust-light`, font-style normal (creates color emphasis within italic text)

## Keypoint Slide

```css
.slide-keypoint {
  text-align: center;
  background: linear-gradient(170deg, var(--bg-warm) 0%, var(--bg-dark) 100%);
}
```

**Elements:** kicker (optional) → h2 (heading) → body  
**Heading:** `clamp(1.8rem, 4vw, 3.8rem)`, weight 900, `--font-display`, max-width 20ch  
**Kicker:** `--font-ui`, uppercase, letter-spacing 0.3em, `--olive-light`  
**Body:** `clamp(0.95rem, 1.6vw, 1.2rem)`, `--font-body`, weight 300, `--cream-dim`, max-width 48ch

## Reveal Slide

```css
.slide-reveal {
  text-align: center;
  background: linear-gradient(170deg, #22201a 0%, var(--bg-dark) 100%);
}
```

**Elements:** reveal-kicker → h2 (heading) → body  
**Same layout as keypoint** but kicker uses `--gold` instead of `--olive-light`, and body is italic. The different kicker color and background gradient distinguish it visually as a "this is important" moment.

## Concept Slide

```css
.slide-concept {
  text-align: center;
  background: linear-gradient(170deg, var(--bg-warm) 0%, var(--bg-dark) 100%);
}
```

**Elements:** concept-label → concept-box (containing h2) → body  
**Concept box:** `background: rgba(--cream, 0.04)`, `border: 1px solid rgba(--cream, 0.1)`, border-radius 4px, padding 4vh 4vw, max-width 650px  
**Box heading:** `clamp(1.2rem, 2.4vw, 2rem)`, weight 700, `--font-display`  
**Label:** `--font-ui`, uppercase, `--rust`  
**Body:** below the box, `--font-body`, weight 300, max-width 50ch

## Options Slide

```css
.slide-options {
  text-align: center;
  background: linear-gradient(170deg, var(--bg-warm) 0%, var(--bg-dark) 100%);
}
```

**Elements:** h2 (heading) → options-grid (flex row, wrapping)  
**Option cards:** `--charcoal` background, 1px border, border-radius 4px, `clamp(200px, 22vw, 260px)` width  
**Highlighted card:** `border-color: --gold`, `transform: scale(1.04)`, box-shadow with gold glow  
**Card internals:** option-letter (`--font-display`, 1.8rem, `--gold`) → h3 → p

## List Slide

```css
.slide-list {
  text-align: left;
  align-items: flex-start;
  padding-left: 12vw;
  padding-right: 12vw;
  background: linear-gradient(170deg, var(--bg-warm) 0%, var(--bg-dark) 100%);
}
```

**Only left-aligned slide type.** All others center.  
**Elements:** list-label → h2 → ul.list-items  
**List items:** `padding-left: 2em`, `::before` pseudo-element with `attr(data-num)` for number, `--gold` color  
**`<strong>` in items:** `--cream`, weight 600 (creates bold lead-in pattern: "**Don't expect memory.** Each conversation starts fresh.")

## Summary Slide

```css
.slide-summary {
  text-align: center;
  background: linear-gradient(170deg, #252218 0%, var(--bg-dark) 100%);
}
```

**Elements:** h2 → summary-grid (CSS grid, 2 columns)  
**Grid:** `gap: 1.5vh 3vw`, max-width 700px  
**Items:** `--font-body`, `clamp(0.8rem, 1.2vw, 0.95rem)`, `--cream-dim`, with `::before '—'` in `--gold-dim`

## Quiz Slide

```css
.slide-quiz {
  text-align: center;
  background: linear-gradient(170deg, #1e1c17 0%, var(--bg-dark) 100%);
}
```

**Elements:** quiz-label → quiz-counter → h2 (question) → quiz-options (flex column) → quiz-feedback  
**Options:** `--charcoal` background, flex row with letter + text, cursor pointer  
**States:** `.selected` (gold border), `.correct` (green-dim), `.incorrect` (red-dim, opacity 0.6), `.locked` (pointer-events none)  
**Feedback:** `--font-body`, italic, min-height 2em (prevents layout shift)

## Results Slide

```css
.slide-results {
  text-align: center;
  background: linear-gradient(170deg, #252218 0%, var(--bg-dark) 100%);
}
```

**Elements:** results-label → score-display → score-status → score-detail → waitlist-box  
**Score display:** `clamp(4rem, 10vw, 8rem)`, weight 900, `--font-display`  
**Pass/fail coloring:** `.passed` uses `--olive-light`, `.failed` uses `--rust`  
**Waitlist box:** bordered card with email input + submit button, success message hidden by default

## Responsive Behavior (all types)

```css
@media (max-width: 768px) {
  .slide { padding: 3vh 5vw; }
  .slide-list { padding-left: 5vw; padding-right: 5vw; }
  .options-grid { flex-direction: column; align-items: center; }
  .option-card { width: 85vw; }
  .summary-grid { grid-template-columns: 1fr; }
  .waitlist-form { flex-direction: column; }
}
```
