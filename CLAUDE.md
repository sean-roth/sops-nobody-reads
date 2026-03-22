# CLAUDE.md — Agent Onboarding

## Project Overview

**SOPs Nobody Reads** is a training consultancy that converts company documentation into engaging SCORM e-learning modules. This repo houses courses including the AI Onboarding Course (6 modules) and the LOTO Course (3 modules).

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

### Issue Dependencies — RUN SEQUENTIALLY

**When issues have dependency chains (e.g., "Depends on #44"), they MUST be run one at a time.** Merge each prerequisite issue's PR into main before starting the next issue in the chain.

**DO NOT run dependent issues in parallel.** If issue B depends on issue A's output (files, data, templates), issue B will not find those files on main and will either fail or duplicate all of issue A's work — wasting API calls and creating conflicting branches.

**Example of what goes wrong:** Issues #44→#45→#46 were created with explicit dependency chains but run in parallel. Issue #46 couldn't find the JSON files from #44 or the player template from #45, so it rebuilt everything from scratch. Result: $5 in API calls for work that three issues could have done for ~$2 if run sequentially.

**Rule:** If an issue body says "Depends on #XX", wait until #XX is merged to main before starting work.

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
├── courses/loto/
│   ├── scripts/                       ← 3 module scripts with panel-logic annotations
│   ├── builds/                        ← Module players, JSON data, image prompts
│   ├── BRIEF.md                       ← Creative brief
│   └── README.md                      ← Course overview
├── docs/
├── skills/
├── tools/
└── workflows/
```

---

## Current State

### AI Onboarding Course
All 6 modules **COMPLETE** with players and images deployed on GitHub Pages.

### LOTO Course (Lockout/Tagout)
Scripts complete. Players built with Industrial theme (dark blue). Images pending.

---

## Image Generation

### Model & Settings
- **Model:** `bytedance/seedream-4.5` on Replicate
- **Aspect ratio:** 16:9
- **AI Onboarding style suffix:** "Warm digital illustration in animated film concept art style. Soft painterly brushstrokes, rounded stylized forms, warm golden brown amber color palette, rich saturated warm tones, cinematic composition."
- **LOTO style suffix:** "Sequential art panel, industrial safety illustration, high contrast, limited color palette with dark blue shadows and safety orange/yellow accents, graphic novel quality, dramatic lighting, slightly stylized but grounded, no text in image, no faces visible"

### Full prompts are in each course's `builds/IMAGE-PROMPTS.md`

### If images come out too photorealistic
Add "stylized, illustration, not photographic" to reinforce the art style.

---

## How Modules Are Built

Read `.claude/BUILD-SPEC.md` for the full spec. Key points:

1. Each module is a **single self-contained HTML file** — inline CSS, inline JS, no build tools
2. The CSS and JS are **identical** across all modules within a course. **Do NOT refactor them.** Only the `MODULE` const changes.
3. Content lives in a `const MODULE = { ... }` JavaScript object at the top of the file
4. Module 1 of each course is the production reference — copy it as template for new modules
5. The `module-XX.json` files in `builds/` are the structured data that gets embedded into the MODULE const
6. 8 slide types: `title`, `scene`, `keypoint`, `options`, `reveal`, `concept`, `list`, `summary`
7. Quiz: 4 options per question, 0-indexed `correct` field, 75% passing threshold

### Build Process for New Modules
1. Read the script from the course's `scripts/` directory
2. Decompose into slides using slide types (see BUILD-SPEC.md and DESIGNER-BRIEF.md)
3. Copy the course's Module 1 index.html as template
4. Replace the MODULE object with new content
5. Update: moduleNumber, title, partLabel, results slide text
6. Generate images per IMAGE-PROMPTS.md conventions
7. Test in browser — all slides, quiz scoring, SCORM graceful degradation

---

## Engineering Rules

1. **Follow the Git Workflow above** — branch, commit, push, open PR. The PR is the deliverable.
2. **Log your work** in `.claude/ENGINEER-LOG.md` — timestamps, what you did, what needs review
3. **Don't touch the player CSS/JS.** The player works. Only swap MODULE data and module-specific metadata.
4. **Images go in `module-XX/img/`** with the naming convention `sXX-descriptive-slug.jpg`
5. **Commit messages** should be descriptive: "Add Module 2 images s03-s10" not "update files"
6. **Test before declaring done** — verify slide count matches MODULE object, quiz scoring works, images load
7. If you hit a problem you can't resolve, document it in ENGINEER-LOG.md and stop. Don't improvise workarounds on the player code.
8. **Run dependent issues sequentially.** If an issue says "Depends on #XX", do NOT start until #XX is merged to main. See "Issue Dependencies" section above.

---

## Replicate API Usage

When generating images via Replicate:
- Use `bytedance/seedream-4.5`
- Set aspect ratio to `16:9`
- The API can sometimes fail or timeout — retry once, then log the failure
- Download the output URL and commit the JPG to the img/ directory
- Name files exactly as the MODULE object expects
