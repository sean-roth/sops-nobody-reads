# Designer Brief — AI Onboarding Course

**Last Updated:** February 23, 2026
**Role:** This file is maintained by the Designer (Claude Opus via claude.ai). It provides creative direction to the Engineer (Claude Code).

---

## Current Status

### Scripts (all in `courses/ai-onboarding/scripts/`)

| Module | File | Status | Notes |
|--------|------|--------|-------|
| 1 | `module-01-what-is-this-thing.md` | ✅ Script done, player built | Player live in sean-roth-ai |
| 2 | `module-02-the-ghost-in-the-machine.md` | ✅ Script done | Needs player build |
| 3 | `module-03-the-problem-is-you.md` | ✅ Script done | Needs player build |
| 4 | `module-04-say-what-you-mean.md` | ⚠️ Script exists, UNREVIEWED | Written by previous Claude session. Sean has not verified. |
| 5 | `module-05-build-your-playbook.md` | ⚠️ Script exists, UNREVIEWED | Written by previous Claude session. Sean has not verified. |
| 6 | `module-06-rules-of-the-road.md` | ⚠️ Script exists, UNREVIEWED | Written by previous Claude session. Sean has not verified. |

### Players Built

| Module | Location | Status |
|--------|----------|--------|
| 1 | `sean-roth-ai/public/courses/ai-onboarding/module-01/` | ✅ Complete with 23 images |
| 2-6 | — | ❌ Not built |

---

## Course Structure

**Course Title:** "So You Want to Work with AI!"
**Aesthetic:** 1960s educational film / driver's ed. Warm, authoritative, slightly wry narrator. Film grain, vignette, serif typography.
**Character:** Joe — everyman office worker. Sympathetic, not stupid. Makes the mistakes everyone makes.

### Part One — "Why You're Failing" (Free lead magnet, ~75 min)

**Module 1: What Is This Thing, Anyway?** (~25 min)
Establishes the alien intelligence frame. AI is not a person, not search, not autocomplete. Pattern completion at massive scale. The existential wobble. Joe discovers AI has no memory.

**Module 2: The Ghost in the Machine** (~20 min)
Hamlet cold open. Theater/directing as metaphor. The context window explained. Joe learns that what you give the machine shapes what you get back. Introduces the fluency trap deeper.

**Module 3: The Problem Is You (And That's Good News)** (~30 min)
Merges clear thinking + writing is thinking + know thyself. Joe tries "write me an email" three times, fails. The Sixty-Second Check framework. Margaret reading the wrong-sounding email. Oracle at Delphi callback. Completes Part One.

### Part Two — "How to Actually Do It" (Paid, ~90 min)

**Module 4: Say What You Mean** (~25 min)
Behavioral shift from commands to conversation. Steer/Refine/Extend framework. Context feeding. Joe learns to iterate instead of one-shotting.

**Module 5: Build Your Playbook** (~25 min)
Capstone artifact: the Working Context Document. Personal workflow construction. AI Opportunity Audit. System prompts as "training your AI employee."

**Module 6: Rules of the Road** (~20 min)
Ethics, data safety, accountability. Red lines (PII, confidential info). Verification responsibilities. Brief MCP awareness (not deep dive). Where to go next. Clean ending.

---

## Running Creative Threads

These threads weave across modules. Don't drop them:

1. **Alien Intelligence** — Established in M1. Referenced throughout. The core reframe.
2. **Oracle at Delphi / "Know Thyself"** — Introduced M1, deepened M3. The human side of the equation.
3. **Theater / Directing** — Introduced M2. You're the director, AI is the actor. Feed it direction.
4. **Joe's Arc** — Starts clueless (M1), gets frustrated (M2-3), starts improving (M4), becomes competent (M5), understands responsibility (M6). He should feel like a real person growing.
5. **The Fluency Trap** — Repeated beat: AI sounds confident whether right or wrong. YOUR judgment is the product.

---

## Image Generation Guidance

Module 1 images were generated (likely via Replicate or similar). They have a consistent style:
- Warm, slightly desaturated tones matching the brown/cream palette
- Semi-realistic, painterly quality
- Joe appears as a generic office worker (white shirt, slightly rumpled)
- Conceptual scenes (mythology, campfire, alien intelligence) are more abstract/atmospheric

For new modules, maintain this visual consistency. When generating images:
- Match the color temperature (warm browns, muted)
- Keep Joe's appearance consistent
- One image per content slide (quiz and summary slides don't need images)
- Name: `sXX-descriptive-slug.jpg`

---

## Priority for Engineer

**Immediate goal: Get all 6 module players built today.**

1. Start with Modules 2 and 3 — scripts are Designer-verified
2. Then Modules 4-6 — scripts exist but Sean hasn't reviewed them. Build the players anyway; content can be revised later. The player architecture is the bottleneck, not the scripts.
3. Images can be placeholder or omitted initially — the player works without them (falls back to gradient backgrounds)
4. Copy finished players to BOTH repos

---

## Script → Slide Decomposition Guidance

When converting a script to MODULE slides:

- **COLD OPEN / Joe scenes** → `scene` type. Keep text punchy, use `<em>` for the emotional beat.
- **"Here's what's really happening" explanations** → `keypoint` type. The heading is the insight, body is the elaboration.
- **Big dramatic reveals** → `reveal` type. Gold kicker, huge heading, italic body.
- **Frameworks / definitions / key quotes** → `concept` type. The box holds the core idea.
- **Compare/contrast / multiple perspectives** → `options` type. Highlight the correct/preferred one.
- **End-of-section takeaways** → `list` type with numbered items.
- **End-of-module recap** → `summary` type.

Pacing: aim for ~25-30 slides per module. Alternate between scene/keypoint/reveal to create rhythm. Don't stack 5 keypoints in a row — break them up with scenes or concepts.

Each slide should be ONE idea. If you're cramming two thoughts into one slide, split it.

---

## Questions for the Engineer

Log answers in ENGINEER-LOG.md:
- Did the SCORM API work when tested in an iframe?
- Any issues with image loading / preloading on slower connections?
- Mobile responsive — did anything break on phone-width screens?
