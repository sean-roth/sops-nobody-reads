# CLAUDE.md — Agent Onboarding

## Project Overview

**SOPs Nobody Reads** is a training consultancy that converts company documentation into engaging SCORM e-learning modules. This repo houses the AI Onboarding Course — a 6-module course teaching employees how to work effectively with AI tools.

**Owner:** Sean Roth (sean@seanroth.ai)

---

## Repo Structure

```
sops-nobody-reads/
├── CLAUDE.md                          ← You are here
├── .claude/
│   ├── BUILD-SPEC.md                  ← **READ THIS FIRST** — Complete player architecture
│   ├── DESIGNER-BRIEF.md              ← Slide type selection guidance
│   └── ENGINEER-LOG.md                ← Log your work here
├── courses/ai-onboarding/
│   ├── scripts/                       ← Source scripts (Markdown, all 6 modules written)
│   ├── builds/
│   │   ├── IMAGE-PROMPTS.md           ← All image generation prompts + style guide
│   │   ├── module-01.json             ← Module 1 slide data
│   │   ├── module-01/index.html       ← Module 1 player (PRODUCTION REFERENCE)
│   │   ├── module-02.json             ← Module 2 slide data
│   │   └── module-02/
│   │       ├── index.html             ← Module 2 player (BUILT, needs images)
│   │       └── img/                   ← EMPTY — images need uploading
│   ├── OUTLINE.md                     ← Full course outline
│   ├── CONTENT-NOTES.md
│   ├── PRODUCTION-NOTES.md
│   └── ROADMAP.md
├── docs/
├── skills/
├── tools/
└── workflows/
```

---

## IMMEDIATE TASK: Finish Module 2

Module 2 ("The Ghost in the Machine") player HTML is committed and working. The only remaining work is images.

### What's Done
- ✅ `module-02/index.html` — complete player with 22 slides + 4 quiz questions
- ✅ `module-02.json` — structured slide data
- ✅ `IMAGE-PROMPTS.md` — all 21 image prompts written

### What's Needed
1. **Generate and upload 21 images** to `courses/ai-onboarding/builds/module-02/img/`
2. Two images failed during earlier generation and need fresh runs: `s01-hamlet-dies.jpg` and `s02-audience-cries.jpg`
3. `s19-accept-it.jpg` has two candidate versions (v3 and v4) — Sean will pick, but generate a fresh one if neither is available
4. GitHub Pages needs to be enabled on this repo (Sean does this manually in Settings → Pages → Source: main)

### Image Filenames Expected by the Player
The `index.html` MODULE object references these exact paths:
```
img/s01-hamlet-dies.jpg
img/s02-audience-cries.jpg
img/s03-actor-backstage.jpg
img/s04-the-asterisk.jpg
img/s05-brain-assumes.jpg
img/s06-first-time-wrong.jpg
img/s07-expect-memory.jpg
img/s08-argue-consistency.jpg
img/s09-manage-feelings.jpg
img/s10-opinions.jpg
img/s11-empty-theater.jpg
img/s12-no-ghost.jpg
img/s13-talk-like-person.jpg
img/s14-two-truths.jpg
img/s15-directors-chair.jpg
img/s16-giving-direction.jpg
img/s17-what-works.jpg
img/s18-make-believe.jpg
img/s19-accept-it.jpg
img/s20-the-deal.jpg
img/s21-direct-well.jpg
```

---

## Image Generation

### Model & Settings
- **Model:** `bytedance/seedream-4.5` on Replicate
- **Aspect ratio:** 16:9
- **Style suffix** (append to ALL prompts): "Warm digital illustration in animated film concept art style. Soft painterly brushstrokes, rounded stylized forms, warm golden brown amber color palette, rich saturated warm tones, cinematic composition."

### Full prompts are in `courses/ai-onboarding/builds/IMAGE-PROMPTS.md`

### If images come out too photorealistic
Add "stylized, illustration, not photographic" to reinforce the art style.

### Module 2 Visual Through-Line
Theater metaphor — rich reds, velvet, gilded trim, stage lighting in opening/closing. Office/AI imagery in the middle "What Goes Wrong" section, then back to theater for resolution.

---

## How Modules Are Built

Read `.claude/BUILD-SPEC.md` for the full spec. Key points:

1. Each module is a **single self-contained HTML file** — inline CSS, inline JS, no build tools
2. The CSS and JS are **identical** across all modules. **Do NOT refactor them.** Only the `MODULE` const changes.
3. Content lives in a `const MODULE = { ... }` JavaScript object at the top of the file
4. Module 1 (`module-01/index.html`) is the production reference — copy it as template for new modules
5. The `module-XX.json` files in `builds/` are the structured data that gets embedded into the MODULE const
6. 8 slide types: `title`, `scene`, `keypoint`, `options`, `reveal`, `concept`, `list`, `summary`
7. Quiz: 4 options per question, 0-indexed `correct` field, 75% passing threshold

### Build Process for New Modules
1. Read the script from `courses/ai-onboarding/scripts/module-XX-*.md`
2. Decompose into slides using slide types (see BUILD-SPEC.md and DESIGNER-BRIEF.md)
3. Copy Module 1's index.html as template
4. Replace the MODULE object with new content
5. Update: moduleNumber, title, partLabel, results slide text ("Module X of 6")
6. Generate images per IMAGE-PROMPTS.md conventions
7. Test in browser — all slides, quiz scoring, SCORM graceful degradation

---

## Course Modules (6 total)

| # | Title | Script | Player | Status |
|---|-------|--------|--------|--------|
| 1 | What Is This Thing, Anyway? | ✅ | ✅ Built + images | **COMPLETE** |
| 2 | The Ghost in the Machine (There Isn't One) | ✅ | ✅ Built, needs images | **IN PROGRESS** |
| 3 | The Problem Is You (A Love Letter) | ✅ Written | Not started | Queued |
| 4 | Say What You Mean (Your First Real Skill) | ✅ Written | Not started | Queued |
| 5 | Build Your Playbook | ✅ Written | Not started | Queued |
| 6 | Rules of the Road | ✅ Written | Not started | Queued |

---

## Engineering Rules

1. **Log your work** in `.claude/ENGINEER-LOG.md` — timestamps, what you did, what needs review
2. **Don't touch the player CSS/JS.** The player works. Only swap MODULE data and module-specific metadata.
3. **Images go in `module-XX/img/`** with the naming convention `sXX-descriptive-slug.jpg`
4. **Commit messages** should be descriptive: "Add Module 2 images s03-s10" not "update files"
5. **Test before declaring done** — verify slide count matches MODULE object, quiz scoring works, images load
6. If you hit a problem you can't resolve, document it in ENGINEER-LOG.md and stop. Don't improvise workarounds on the player code.

---

## Replicate API Usage

When generating images via Replicate:
- Use `bytedance/seedream-4.5`
- Set aspect ratio to `16:9`
- The API can sometimes fail or timeout — retry once, then log the failure
- Download the output URL and commit the JPG to the img/ directory
- Name files exactly as the MODULE object expects

---

## What Sean Needs To Do (Not Agent Tasks)

- Enable GitHub Pages (Settings → Pages → Source: main branch)
- Final pick on s19-accept-it.jpg variant (v3 vs v4) — generate a default if no guidance
- Review completed module in browser before marking complete
