# LOTO Course — Production Log

## Session: March 21, 2026 (Saturday afternoon → evening)

**What we built:** A complete 3-module Lockout/Tagout course skeleton — from raw SOP document to viewable HTML players in one session.

**Result:** https://sean-roth.github.io/sops-nobody-reads/courses/loto/builds/index.html

---

## The Pipeline (What Actually Happened)

### Step 0: Document Prep (Sean, ~2 minutes)
Sean converted the Texas OSHCON LOTO Sample Written Program (PDF) to markdown using **pdftomarkdown.com** and pasted it into the conversation. No custom PDF parser needed. The tool handled the conversion; Claude got clean text to work with.

**Lesson:** Don't build parsers for one-off document ingestion. Free web tools handle PDF-to-markdown well enough. The important thing is getting the content into a format Claude can read, not building infrastructure around it.

### Step 1: SOP Analysis → Training Brief (~20 minutes)
Used the **sop-analyzer** skill to decompose the LOTO document into:
- Must-know content (9 topic areas, each tagged with compliance requirement)
- Recommended module structure (3 modules with titles and estimated durations)
- Learning objectives (9 specific outcomes)
- Knowledge gaps (5 items the template doesn't resolve)
- Questions for client (8 questions for client-specific deployment)
- Narrative opportunities (5 cold open / story angle ideas)

**Key decisions made during analysis:**
- Three modules, not six — the content naturally splits into why/how/edge cases
- The thesis crystallized: "The procedure is simple. That simplicity is what makes it dangerous."
- Target audience defined as maintenance techs (primary) and safety directors (buyer)

### Step 2: Creative Direction Discussion (~30 minutes)
This was the most important part of the session. Through back-and-forth:

**Visual direction:** Rejected Editorial (too contemplative for mortal stakes), Retro (too playful), and Corporate (too generic). Landed on a new **Industrial** theme — dark backgrounds, safety yellow/orange accents, the visual language of the shop floor.

**The image problem:** AI-generated images of death/injury are heavily censored and inappropriate anyway. Solved by applying **sequential art principles** — show the setup and aftermath, never the event. The gutter (space between panels) carries the consequence through the viewer's imagination, which is both more powerful pedagogically and completely content-safe.

**Human presence:** Decided on faceless workers — hands in gloves, silhouettes, figures-from-behind. McCloud's abstraction principle: no face means the viewer becomes the character. PPE naturally obscures identity while signaling "real workplace."

**The branding epiphany:** Sequential art isn't just a visual style for this course — it's the SOPs Nobody Reads methodology. Cave paintings → comics → industrial training. The oldest communication technology applied to the thing corporations do worst.

### Step 3: Built the panel-logic Skill (~20 minutes)
Before writing scripts, we encoded the sequential art methodology as a reusable skill:

**SKILL.md** (146 lines) — 5 McCloud principles mapped to training, "camera is the coworker" principle, integration points with existing skills

**references/panel-transitions.md** (159 lines) — 6 transition types with training-specific examples, the gutter taxonomy (time → action → spatial → narrative → implication)

**references/script-integration.md** (166 lines) — New PANEL/GUTTER/TRANSITION script markers, cold open pattern as panel sequence, abstraction-to-emotional-register mapping

**references/visual-vocabulary.md** (197 lines) — Abstraction rules by subject type, composition patterns, coworker camera angles, Replicate prompt templates

**Critical addition:** "Show Your Reasoning" requirement — Claude must explain the McCloud principle behind every panel-logic decision. This enables faster creative feedback because Sean can engage with the logic, not just the output.

**Lesson:** Build the skill BEFORE writing the first script. The skill IS the methodology. Without it, the insights from this conversation die when the context window closes.

### Step 4: Scripted All 3 Modules (~45 minutes)
Wrote complete scripts with panel-logic annotations, production notes, and quizzes:

- **Module 1: "The Energy You Don't See"** (~22K) — Five energy types, "off" vs "safe," stored energy
- **Module 2: "The Six Steps"** (~24K) — Full lockout sequence, one-person-one-lock, verification
- **Module 3: "When Simple Gets Complicated"** (~26K) — Group lockout, shift changes, emergency removal, roles

Each script includes:
- PANEL/GUTTER/TRANSITION markers with McCloud reasoning in HTML comments
- Full production notes (panel-logic decisions, transition patterns, abstraction maps, gutter inventories, tone calibration)
- 4 quiz questions with correct answers
- Course-level continuity notes (recurring motifs: "everyone goes home safe," "two minutes and a padlock")

**Lesson:** The three cold opens form their own narrative across the course — Module 1 (unlocked disconnect), Module 2 (sign instead of lock), Module 3 (shift change gap). Each is a different failure mode. Plan these as a set, not individually.

### Step 5: Pushed to GitHub (~5 minutes)
Pushed creative brief, README, and all three scripts to `courses/loto/` on the repo. Scripts went to `courses/loto/scripts/`.

### Step 6: Created Build Issues (~15 minutes)
Created 5 GitHub issues for Claude Code to execute:
- #44: LXD decomposition (scripts → MODULE JSON)
- #45: Module 1 player with Industrial theme
- #46: Module 2 + 3 players
- #47: Course landing page
- #48: Image generation prompts

### Step 7: Claude Code Execution (~10 minutes, parallel)
Claude Code ran all 5 issues. Due to parallel execution (see Problems below), #46 rebuilt everything from scratch. Net result: all deliverables produced, but with redundant work.

### Step 8: Review, Merge, Deploy (~10 minutes)
Reviewed branches, identified the merge strategy (#46 first as the complete package, then #47 and #48), closed redundant issues with notes, merged to main. Course visible on GitHub Pages immediately.

---

## Problems and Lessons

### 1. Parallel Issue Execution Wasted API Calls
Issues #44→#45→#46 had explicit dependency chains, but Claude Code ran them all simultaneously. #46 couldn't find prerequisite files on main, so it rebuilt everything — JSON decomposition, Module 1 player, AND Modules 2-3. Cost ~$5 instead of ~$2.

**Fix:** Added rule to CLAUDE.md: "If an issue says 'Depends on #XX', wait until #XX is merged to main before starting work." Also added Engineering Rule #8 about sequential execution.

**For next time:** Either run issues sequentially (merge each before kicking off the next) or consolidate dependent work into fewer, larger issues.

### 2. PDF Conversion Was a Non-Issue
Initially considered whether we needed to build a PDF parser. The answer was no — pdftomarkdown.com handled it, and the resulting markdown was clean enough for Claude to analyze. For client engagements, this means document intake is a 2-minute step, not an engineering project.

### 3. The Skill Should Come Before the Scripts
Building the panel-logic skill before writing scripts was the right call. The scripts are measurably better because the methodology was encoded first — every panel choice has explicit McCloud reasoning, which means future editing is faster and other Claude instances can make consistent decisions.

### 4. Industrial Theme Color Decisions Were Made in Conversation, Not in Code
The dark blue palette was decided during discussion but only specified in the GitHub issue. Claude Code had to interpret "dark blue industrial" into specific hex values. Next time, specify the full CSS custom properties in the issue body (which we did for #45 — that worked well).

---

## Timeline

| Time | Activity | Output |
|------|----------|--------|
| Start | Sean pastes LOTO markdown | Raw content in conversation |
| +20 min | SOP analysis complete | Training brief with 3 modules |
| +50 min | Creative direction settled | Visual strategy, thesis, Industrial theme |
| +70 min | panel-logic skill built | 4 files, 698 lines, installed |
| +115 min | All 3 scripts written | 3 scripts, ~72K total, pushed to repo |
| +130 min | Build issues created | 5 issues on GitHub |
| +140 min | Claude Code finishes | All players built |
| +150 min | Merged and live | Course viewable in browser |

**Total: ~2.5 hours from raw SOP to viewable course skeleton.**

---

## What's Next

1. **Visual review** — Click through all 3 modules, flag any slide text issues
2. **Image generation** — Use IMAGE-PROMPTS.md to generate sequential art panels via Replicate
3. **In-context review** — Upload images, click through as a learner, flag regens and text fixes
4. **Polish** — Consolidated fix issues for Claude Code
5. **Deploy** — Final course live on GitHub Pages

The image generation is the next major creative step. The IMAGE-PROMPTS.md doc is ready with structured prompts for every slide, style suffixes, and the panel-logic reasoning for each image.

---

## Files Created This Session

| File | Size | What It Is |
|------|------|-----------|
| `courses/loto/BRIEF.md` | 2.6K | Creative brief |
| `courses/loto/README.md` | 1.6K | Course overview |
| `courses/loto/scripts/module-01-the-energy-you-dont-see.md` | 22K | Module 1 script |
| `courses/loto/scripts/module-02-the-six-steps.md` | 24K | Module 2 script |
| `courses/loto/scripts/module-03-when-simple-gets-complicated.md` | 26K | Module 3 script |
| `courses/loto/builds/module-01.json` | 8K | Module 1 slide data |
| `courses/loto/builds/module-02.json` | 7.4K | Module 2 slide data |
| `courses/loto/builds/module-03.json` | 7.9K | Module 3 slide data |
| `courses/loto/builds/module-01/index.html` | 35K | Module 1 player (Industrial theme) |
| `courses/loto/builds/module-02/index.html` | 34K | Module 2 player |
| `courses/loto/builds/module-03/index.html` | 35K | Module 3 player |
| `courses/loto/builds/index.html` | 9.5K | Course landing page |
| `courses/loto/builds/IMAGE-PROMPTS.md` | 20.7K | Image generation prompts |
| `CLAUDE.md` | 7.2K | Updated with sequential issue rule |
| `panel-logic/SKILL.md` | 176 lines | Sequential art skill (installed separately) |
| `panel-logic/references/*.md` | 522 lines | Panel transitions, script integration, visual vocabulary |
