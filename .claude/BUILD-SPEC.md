# Build Spec — SOPs Nobody Reads Course Player

**Last Updated:** February 23, 2026
**Source of Truth:** Module 1 player at `sean-roth-ai/public/courses/ai-onboarding/module-01/index.html`

---

## Architecture Overview

Each module is a **single self-contained HTML file** with inline CSS and JS. No build tools, no frameworks, no dependencies beyond Google Fonts CDN. The player is SCORM 1.2 compatible and also works standalone.

### File Structure Per Module

```
module-XX/
├── index.html          # Complete player (CSS + JS + content inline)
├── img/                # Background images per slide
│   ├── s01-slug.jpg    # Named by slide number + description
│   ├── s02-slug.jpg
│   └── ...
└── audio/              # Future: narration audio files
    └── .gitkeep
```

### Where Things Live

- **Scripts (source content):** `sops-nobody-reads/courses/ai-onboarding/scripts/module-XX-title.md`
- **Built players:** `sean-roth-ai/public/courses/ai-onboarding/module-XX/index.html`
- **Built player backup:** `sops-nobody-reads/courses/ai-onboarding/builds/module-XX/index.html`

---

## The MODULE Object

All content is defined in a single JS object. The player reads this object and renders slides dynamically.

```javascript
const MODULE = {
  title: "Module Title",
  moduleNumber: 1,
  partLabel: "Part One — Know Thy Machine",
  passingScore: 75,

  slides: [
    // Array of slide objects — see Slide Types below
  ],

  quiz: [
    // Array of quiz question objects — see Quiz Format below
  ],
};
```

---

## Slide Types

The player supports 8 slide types. Each has a distinct visual treatment.

### 1. `title`
Module opener. Large heading, subtitle, brand footer.
```javascript
{ type: "title", moduleLabel: "Module 1", heading: "Title Text", subtitle: "Part label", brand: "SOPs Nobody Reads" }
```

### 2. `scene`
Narrative moment. Joe scenarios, story beats. Italic display font. Uses `<em>` for emphasis (renders in rust color).
```javascript
{ type: "scene", label: "Scene", text: "Joe does something. <em>Emphasis here.</em>", image: "img/sXX-slug.jpg" }
```

### 3. `keypoint`
Core teaching moment. Large heading + supporting body text.
```javascript
{ type: "keypoint", kicker: "Small Label Above", heading: "Big Statement\nWith Linebreaks", body: "Supporting explanation.", image: "img/sXX-slug.jpg" }
```
`heading` supports `\n` for line breaks (rendered as `<br>`).

### 4. `options`
Multiple-choice display (NOT interactive quiz — just visual). One option highlighted.
```javascript
{ type: "options", heading: "Question text?", options: [
  { letter: "A", title: "Option Title", desc: "Description" },
  { letter: "B", title: "Option Title", desc: "Description" },
  { letter: "C", title: "Option Title", desc: "Description" },
], highlighted: "C", image: "img/sXX-slug.jpg" }
```

### 5. `reveal`
Dramatic payoff. Gold kicker, huge heading, italic body.
```javascript
{ type: "reveal", kicker: "Kicker Text", heading: "Big Reveal\nStatement", body: "Italic supporting text.", image: "img/sXX-slug.jpg" }
```

### 6. `concept`
Framed concept/quote. Has a bordered box around the key statement.
```javascript
{ type: "concept", label: "Concept Label", boxText: "Key statement in the box.", body: "Explanation below the box.", image: "img/sXX-slug.jpg" }
```

### 7. `list`
Numbered takeaways. Left-aligned. Items support `<strong>` for emphasis.
```javascript
{ type: "list", label: "Section Label", heading: "Heading", items: [
  { num: "1.", text: "<strong>Bold part.</strong> Rest of item." },
  { num: "2.", text: "<strong>Bold part.</strong> Rest of item." },
], image: "img/sXX-slug.jpg" }
```

### 8. `summary`
End-of-module recap. Grid layout, dash-prefixed items.
```javascript
{ type: "summary", heading: "Module X — Key Concepts", items: [
  "First concept",
  "Second concept",
] }
```

---

## Quiz Format

```javascript
{
  question: "Question text?",
  options: [
    "Option A text",
    "Option B text",
    "Option C text",
    "Option D text",
  ],
  correct: 2,  // 0-indexed
}
```

Quiz behavior:
- 4 options per question (A/B/C/D)
- Click to answer, locks immediately
- Correct answer highlights green, wrong answer dims red
- Feedback text appears below
- Next button disabled until answered
- Results slide auto-calculates score as percentage
- Pass threshold: 75% (configurable per module)

---

## Visual Design System

### Fonts (Google Fonts CDN)
- **Display:** Playfair Display (headings, big statements) — weights 400, 700, 900, italic
- **Body:** Source Serif 4 (body text, descriptions) — weights 300, 400, 600, italic
- **UI:** DM Sans (labels, buttons, progress) — weights 400, 500, 600

### Color Palette
```css
--bg-dark: #1a1812;       /* Main background */
--bg-card: #2a2620;       /* Card backgrounds */
--bg-warm: #332e26;       /* Warm gradient start */
--cream: #f0e8d8;         /* Primary text */
--cream-dim: #c8bfad;     /* Secondary text */
--olive: #5c6b4f;         /* Success/positive accent */
--olive-light: #7a8c6a;   /* Success text */
--rust: #b8704a;          /* Scene labels, emphasis */
--rust-light: #d4956a;    /* Scene em text, error feedback */
--gold: #c9a84c;          /* Highlight, quiz labels */
--gold-dim: #8a7535;      /* Progress bar, muted gold */
--charcoal: #3a3632;      /* Quiz option background */
```

### Film Aesthetic Layers
Three overlays create the vintage look (applied via fixed-position elements):
1. **Grain:** SVG noise texture, `opacity: 0.035`, animated with 4-step `steps()` keyframes
2. **Vignette:** `radial-gradient` darkening edges
3. **Scanlines:** `repeating-linear-gradient` on each slide's `::after` pseudo-element

### Background Images
- Each slide can have an `image` property pointing to `img/sXX-slug.jpg`
- Images are `background-size: cover; background-position: center`
- Dark radial gradient overlay sits between image and content for readability
- Overlay opacity varies by slide type:
  - `scene`: heaviest (0.68 → 0.88)
  - `concept`, `list`: heavy (0.65 → 0.85)
  - `options`: medium (0.58 → 0.82) — cards have own backdrop-filter
  - `keypoint`, `reveal`: default (0.6 → 0.82)
- All slide content gets `z-index: 2` to sit above the overlay
- Option cards and concept boxes use `backdrop-filter: blur(4px)`

### Image Naming Convention
`sXX-descriptive-slug.jpg` where XX is the slide number (zero-padded for single digits in the original, but not strictly required). Examples:
- `s01-joe-productive.jpg`
- `s06-alien-intelligence.jpg`
- `s19a-wobble-hit.jpg` (sub-beats use letter suffix)

---

## Navigation & SCORM

### Navigation
- Bottom bar: progress track (thin line) + fraction counter + prev/next buttons
- Keyboard: Arrow Right / Space = next, Arrow Left = prev
- Prev disabled on first slide, Next disabled on last slide and on unanswered quiz slides

### SCORM 1.2 Integration
- Searches parent frames for `API` object (up to 10 levels)
- On init: sets `lesson_status` to `incomplete` if `not attempted`
- Bookmarking: saves/restores `lesson_location` (slide index)
- On quiz complete: sets `score.raw`, `score.min` (0), `score.max` (100)
- Sets `lesson_status` to `passed` or `failed` based on `passingScore`
- On page unload: sets `exit` to `suspend`, calls `LMSFinish`
- Fails silently if no SCORM API found (standalone mode works fine)

### Results Slide
- Shows percentage score, pass/fail status, correct count
- Includes waitlist CTA box (email signup — currently `console.log` only)
- Results slide text says "Module 1 of 6" — update per module

---

## Build Process for New Modules

1. **Read the script** from `sops-nobody-reads/courses/ai-onboarding/scripts/module-XX-title.md`
2. **Decompose into slides** — map script sections to slide types. Use Designer Brief for guidance on which type fits each beat.
3. **Copy Module 1's index.html** as template — keep ALL CSS and JS identical
4. **Replace the MODULE object** with new slides and quiz content
5. **Update metadata:** moduleNumber, title, partLabel, results slide text
6. **Generate/source images** — one per content slide, named by convention
7. **Test standalone** — open in browser, click through all slides, verify quiz locks/scores
8. **Copy to both repos:**
   - `sean-roth-ai/public/courses/ai-onboarding/module-XX/`
   - `sops-nobody-reads/courses/ai-onboarding/builds/module-XX/`

---

## Important Notes

- The CSS and JS are IDENTICAL across all modules. Only the MODULE object changes.
- Do NOT refactor the CSS/JS. The player works. Ship it.
- Images are optional — slides without `image` property use solid gradient backgrounds (still look good).
- `heading` fields support `\n` for line breaks. Keep lines short for visual impact.
- Scene text supports `<em>` tags. List items support `<strong>` tags.
- The quiz feedback is intentionally terse: "Correct." or "Not quite. The correct answer is highlighted above."
- Module count in results slide: currently says "Module 1 of 6" — update for each module.
