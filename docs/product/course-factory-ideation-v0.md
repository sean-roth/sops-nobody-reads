# The Course Factory — App Ideation (v0)

*Rough thinking, captured from three whiteboards. Not a build spec — a place to gather thoughts while we finish the mold course by hand. The point of writing it down now is that every manual step we're doing is a requirement for a future button.*

---

## The one thing to hold onto

**The workflow we're living is the product spec.** We've been hand-running a pipeline — clean the SOP, interview you, lock a style, write, decompose, generate images, assemble, review. The app is that pipeline with **buttons at the human gates** and **API calls in between**. You're not inventing a process; you're wrapping one you've already proven.

And the corollary you already wrote on the board: **prompting is everything.** The harness is commodity — anyone can build a Laravel app that calls Replicate. What's defensible is the *prompt library* underneath it: the house voice, the panel-logic method, the Seedream lessons, the skills. The app is a body; the skills are the brain. Build the app to protect and compound the brain.

---

## What the whiteboards are actually describing: the pipeline

Reading Board 1 as the spine, here's each stage mapped to the human gate, the model calls behind it, and the skill that already does it.

| # | Stage | Human gate (the button) | Model calls | Cost | Already a skill |
|---|-------|------------------------|-------------|------|-----------------|
| 0 | **Intake** — drop in an SOP (any format) → clean markdown, verify integrity | "Source looks faithful" ✓ | cheap LLM to clean/structure | low | `sop-analyzer` |
| 1 | **Scope + Intake Interview** — "what is this?", ask clarifying questions | Answer the domain questions | cheap LLM to generate questions | low | `sop-analyzer` |
| 2 | **Style lock** — confirm art style + tone, **3 sample frames** | "This is the look" ✓ | **image gen ×3** (expensive) | **high** | `aesthetic-design` |
| 3 | **Content generation** — bulletpoint outline → script; stays true to source; multi-agent, multiple perspectives; create→review→improve | "Script approved" ✓ | LLM draft + LLM review passes | med | `script-writing` + `panel-logic` |
| 4 | **Decompose** — script → MODULE JSON (typed slides, pacing, quiz) | (mostly auto) | LLM structuring | low | `lxd` |
| 5 | **Image generation loop** — per slide: write prompt → review prompt → generate → review → adjust | "Images approved" ✓ | prompt LLM (cheap) + **image gen (expensive)** | **high** | `aesthetic-design` + `panel-logic` |
| 6 | **Assembly** — build the player (`module-0N.json` + `index.html`) | (auto) | none | ~0 | `aesthetic-design` / `scorm-builder` |
| 7 | **Feedback** — a **clean instance** reviews, avoids bias | "Ship it" ✓ | fresh LLM (Claude) review | low | `qa-passes` / `metacognition-system` |
| — | **End** — visual + interactive course delivered | | | | the player we just built |

The striking part: **stages 0, 3, 4, 6, 7 already exist as installed skills.** The mold course walked all of these. The app is mostly UI + orchestration around skills that work.

---

## The reusable engine (Board 2)

Two loops repeat inside the pipeline, and they're the heart of it.

### Loop A — the prompt-first generation loop
> Write the prompt → review the prompt → first Replicate call → review + adjust → iterate → human review.

The load-bearing line on the board: **"text is cheaper than generation."** This isn't just cost — it's a *quality strategy*. Every image dollar is spent only after a cheap text pass has already caught the obvious failure. It's exactly what we do by hand: we argue about the prompt (change the noun, fix the geometry, tune the negatives) *before* spending a generation, because a reroll is expensive and a reworded prompt is free.

The app version: a cheap model drafts and self-critiques the prompt against the panel-logic + Seedream rules, loops on *text* until it passes its own checks, and only *then* spends a Replicate call. Human review comes after the machine has already burned down the cheap failures.

Same loop runs for **scripts** — minus the image model. Create → review → improve, all in text.

### Loop B — record the learnings
Board 1: *"every cycle should record learnings."* This is the compounding asset. The production bible's Seedream section (§8.5) is the hand-built prototype of exactly this — the faucet prior, the crossbones prior, "change the noun after two rerolls." In the app, each generation cycle appends structured lessons to a shared store that later prompt-drafts read from. Do this well and the factory gets *better per course*, not just faster. This is the real moat, more than any single prompt.

---

## Model routing & cost tiers (Board 3)

The board already sketches a smart cost structure:

- **Cheap, fast, open models** (Groq, Fireworks) for the high-volume grunt work: cleaning, drafting prompts, the review-and-adjust cycles. This is where the token volume lives.
- **Claude (Anthropic) as the quality gate** — the "clean instance" that reviews without the bias of having written the thing. Fewer calls, higher stakes.
- **Image: Replicate/Seedream primary, but pluggable.** *"Don't rely on one model. Test others per course. Keep a backup."* Treat the image model as a swappable provider, not a hard dependency.
- **Cost controls + human approvals, especially early.** Expensive calls (image gen) sit behind an approval gate until you trust the pipeline. The gates from the table above are exactly these controls.

Your own flagged risk, and it's the sharpest insight on the boards: **the silent failure will be at prompt creation.** A bad image prompt looks fine and produces a plausible-but-wrong image (the faucet that isn't a faucet). That's *why* the prompt-review step has to be first-class — the cheap text loop isn't just saving money, it's the main defense against the failure mode that won't announce itself.

---

## The data contract (already built)

The `module-0N.json` we just shipped is the spine of the whole system. Everything upstream *produces* it; the player *consumes* it. The repo layout —

```
courses/<slug>/
  BRIEF.md · scripts/ · builds/module-0N.json · builds/module-0N/index.html + img/
```

— is already the app's **output schema**. That massively de-risks the build: the "End" of the whiteboard already exists and works. The app's job is to produce that folder structure from an uploaded SOP. When you can generate that tree automatically, you have the product.

---

## Buttons ↔ API calls (what you asked for)

The app is essentially five approval buttons with automated work between them:

1. **[Approve source]** → cleaned markdown + integrity check ready → unlock interview
2. **[Approve style]** → spent 3 image gens; you pick/confirm → lock palette + seed for the course
3. **[Approve script]** → ran draft + multi-perspective review + source-fidelity check → decompose to JSON
4. **[Approve images]** → ran the prompt-first loop per slide (cheap text iterations, then generations) → assemble player
5. **[Ship]** → clean-instance review passed → export the course folder / deploy

Between each button: queued, async jobs (generation is slow), a running cost meter, and a lessons-log write. The buttons are the product. The judgment stays human; the app just clears the cheap work between judgments.

---

## A hard-nosed take on sequencing

Three honest cautions, because "an app is emerging" is the moment to be disciplined:

1. **Don't build the whole thing.** Build the **single highest-leverage slice first** — almost certainly **Loop A, the image-prompt loop**, because it's the most iteration-heavy, has the clearest cost lever ("text cheaper than generation"), and carries the silent-fail risk. One stage, working, beats a half-built pipeline.

2. **Let the courses be the spec.** Finish mold by hand. Do the next one or two by hand. Every time you make a manual decision, log it as *"this would be a button / this would be a rule."* By course three, the pipeline will have hardened and you'll know which buttons actually save you time versus which ones you'd never trust to automate.

3. **Don't automate the gates away.** The thing that makes the product good is the human (and clean-instance) review. The app should make the *between-gate* work fast and cheap — not remove the judgment. If it ever starts shipping courses without you looking, it's optimizing the wrong thing. The buttons aren't friction; they're the quality.

The order that follows from this: **finish mold → log manual decisions on the next 1–2 courses → build the image-prompt loop as a standalone tool → grow outward to the full pipeline only once the loop pays for itself.**

---

## Open questions to chew on later

- **Where does your time actually go per course?** (So we build the button that saves the most, first.) Worth timing yourself on mold.
- **Cost per finished course** at each model tier — what's the floor, and where does image gen dominate?
- **Storage:** git-as-database (the repo *is* the store, clean and versioned) vs. a real DB with export-to-repo. The repo-native path is simpler and fits how you already work.
- **Quality variance** when cheap models draft prompts — how much Claude-at-the-gate is enough to catch it?
- **Multi-tenancy / order fulfillment** — one client's course vs. many; where does the backlot/reuse logic live?
- **Silent-fail detection** — can a cheap vision model pre-screen a generation against the prompt's intent before it reaches you? (This is where "open source multimodal?" on your board points.)

---

## How this touches the mold course (right now)

Nothing changes today — we finish mold the way we're doing it. But two small habits make the future app cheaper to build:

1. Keep logging Seedream/prompt lessons in the bible in a **consistent, structured shape** (situation → prior/failure → fix). That's Loop B's training data, hand-collected.
2. When you hit a manual decision, drop a one-line note: *"button candidate: X."* By the end of a couple courses you'll have the app's requirements written by the work itself.

---

### Appendix — verbatim whiteboard capture

**Board 1 — the pipeline**
Start: input any format of SOPs. 1. What is this? — clean + process into a markdown file, verify data integrity. 2. Intake Interview — ask questions for clarification from the human. 3. Confirm art style + tone — provide three sample frames. 4. Content Generation — start with bulletpoint; ensure it stays true to origin PDF; (internal) multi-agent; Stanford 5-agent framework — different perspectives; create → review → improve; *every cycle should record learnings. 5. Feedback — a clean instance should look at and decide on feedback; avoid biases. End: finish visual + interactive course.

**Board 2 — priorities + generation loop**
Priorities: mold demo, calls, reach out. Prompt structure for image model. How to make the app / intake interview. Multi-Agent Image Creation: write the prompt → review the prompt → first Replicate call → review + adjust; *text is cheaper than generation*; iterate until you are ready for human review. Same for the script, but no image model; create → review → improve.

**Board 3 — infra & architecture**
Open Source LLM: Groq, Fireworks AI — open source multimodal? then use Anthropic for quality check; more skills?; *a silent fail will probably be when the image prompt is made.* Image Models: Replicate; a backup?; don't rely on one model; test others per course; create samples; human feedback is critical; *cost controls, approvals at first.* Architecture: eventually a self-service app → Laravel; host locally for development.

*(One item to pin down later: the "Stanford 5-agent framework" — worth confirming the exact reference so we build the multi-perspective review step on solid ground rather than my guess at what you meant.)*
