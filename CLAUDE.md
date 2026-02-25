# CLAUDE.md — Agent Onboarding

## Project Overview

**SOPs Nobody Reads** is a training consultancy that converts company documentation into engaging SCORM e-learning modules. This repo houses the AI Onboarding Course — a 6-module course teaching employees how to work effectively with AI tools.

**Owner:** Sean Roth (sean@seanroth.ai)

---

## Git Workflow (CRITICAL)

When working on issues, you MUST follow this workflow:

1. **Create a branch** from `main` named `claude/issue-{number}-{short-description}`
2. **Make your changes** and commit with descriptive messages
3. **Push the branch** to the remote
4. **Open a Pull Request** against `main` with:
   - Title matching the issue title
   - Body that starts with `Closes #{issue_number}`
   - Summary of changes made
5. **Comment on the issue** with a link to the PR

Do NOT just commit and stop. The PR is the deliverable. If you cannot open a PR, comment on the issue explaining what happened and what branch contains the work.

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
│   │   ├── index.html                 ← Course landing page / table of contents
│   │   ├── IMAGE-PROMPTS.md           ← All image generation prompts + style guide
│   │   ├── module-01.json             ← Module 1 slide data
│   │   ├── module-01/index.html       ← Module 1 player (PRODUCTION REFERENCE)
│   │   ├── module-02.json             ← Module 2 slide data
│   │   └── module-02/
│   │       ├── index.html             ← Module 2 player (COMPLETE)
│   │       └── img/                   ← Module 2 images (21 files)
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

## Current State

Module 1 and Module 2 are **COMPLETE** with players and images deployed on GitHub Pages. The course landing page is live at `courses/ai-onboarding/builds/index.html`.

### What's Done
- ✅ Module 1 — complete player with images
- ✅ Module 2 — complete player with 22 slides, 4 quiz questions, 21 images
- ✅ Course landing page — 6 module cards, responsive design
- ✅ GitHub Pages enabled

### What's Needed
- Home/menu button in module player bottom bars (Issue #2)
- Module 3-6 player shells built from scripts (Issue #4)
- Images for Modules 3-6 (future)

---

## Image Generation

### Model & Settings
- **Model:** `bytedance/seedream-4.5` on Replicate
- **Aspect ratio:** 16:9
- **Style suffix** (append to ALL prompts): "Warm digital illustration in animated film concept art style. Soft painterly brushstrokes, rounded stylized forms, warm golden brown amber color palette, rich saturated warm tones, cinematic composition."

### Full prompts are in `courses/ai-onboarding/builds/IMAGE-PROMPTS.md`

### If images come out too photorealistic
Add "stylized, illustration, not photographic" to reinforce the art style.

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
| 1 | You've Used AI Before (You Just Didn't Know It) | ✅ | ✅ Built + images | **COMPLETE** |
| 2 | The Ghost in the Machine (There Isn't One) | ✅ | ✅ Built + images | **COMPLETE** |
| 3 | How It Actually Works (The 2-Minute Version) | ✅ Written | Not started | Queued |
| 4 | The Real Problem Is You (And That's Good News) | ✅ Written | Not started | Queued |
| 5 | The Prompt Is the Product | ✅ Written | Not started | Queued |
| 6 | The Rules of the Road | ✅ Written | Not started | Queued |

---

## Engineering Rules

1. **Follow the Git Workflow above** — branch, commit, push, open PR. The PR is the deliverable.
2. **Log your work** in `.claude/ENGINEER-LOG.md` — timestamps, what you did, what needs review
3. **Don't touch the player CSS/JS.** The player works. Only swap MODULE data and module-specific metadata.
4. **Images go in `module-XX/img/`** with the naming convention `sXX-descriptive-slug.jpg`
5. **Commit messages** should be descriptive: "Add Module 2 images s03-s10" not "update files"
6. **Test before declaring done** — verify slide count matches MODULE object, quiz scoring works, images load
7. If you hit a problem you can't resolve, document it in ENGINEER-LOG.md and stop. Don't improvise workarounds on the player code.

---

## Replicate API Usage

When generating images via Replicate:
- Use `bytedance/seedream-4.5`
- Set aspect ratio to `16:9`
- The API can sometimes fail or timeout — retry once, then log the failure
- Download the output URL and commit the JPG to the img/ directory
- Name files exactly as the MODULE object expects
