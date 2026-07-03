# Course Factory — Thread Index

*A launchpad, not a plan. Each block below is a **separate conversation** you can open cold — it names the aspect, why it matters, what I can bring from having lived the mold build, and the open questions to start on. We are **not building the app now.** The mold course stays the main track; this just keeps the thinking sorted so no thread has to restart from zero.*

*Companion docs: `course-factory-ideation-v0.md` (the overview), `course-factory-roadmap.md` (the phasing that governs **when** and **what each phase optimizes for** — read this before any thread), `course-factory-assembly-review.md` (the first aspect, in full), and `course-factory-local-model-ladder.md` (the describe-then-reason cost architecture — proven on hardware, feeds threads 1, 3, and 5).*

---

## 1. Assembly & Joint Review — "the black box" ✅ *written up separately*
**The core problem:** a course is invisible until it's assembled, and image + text are meaningless apart. So we need (a) rendering *earlier*, and (b) a way for the AI to review image and text *together* — which is a real token-cost problem at ~10 images/module.
→ Full treatment in `course-factory-assembly-review.md`. This is the ripest thread and the one I have the most front-line signal on.

## 2. The Generation Loops
**Core:** the prompt-first loop — *text is cheaper than generation* — and the record-learnings store that makes the factory smarter per course.
**What I bring:** we ran this loop by hand ~40 times on the mold images. I know where the cheap-text iteration actually catches things (the noun-swap, the negative prompts) and where it can't (priors that only show once rendered).
**Open questions:** how many text-review cycles before a generation is worth it? What's the structured shape of a "learning" so the store is machine-usable, not just prose? Does the script loop (no image model) share the same engine?

## 3. Model Routing & Cost Tiers
**Core:** cheap open models (Groq, Fireworks) for volume drafting/review, Claude as the quality gate, image gen behind approvals.
**What I bring:** a felt sense of which steps are "cheap and forgiving" (cleaning, outlining, prompt drafts) vs. "expensive and unforgiving" (generation, final review) — the routing map falls out of that.
**Open questions:** where's the quality floor for cheap models on *our* prompts? How much Claude-at-the-gate is enough to catch a cheap model's miss? Provider abstraction so no single model is load-bearing.

## 4. The Pipeline & Human Gates
**Core:** the stage machine from Board 1 — five approval buttons with automated work between them, and the state/queue model underneath.
**What I bring:** the actual gate points, tested — where you *must* look (style lock, script, images, ship) vs. where automation is safe (cleaning, decomposition, assembly).
**Open questions:** what's the minimal state a course-in-progress needs to track? How do partial/failed runs resume? Which gates would you never automate away?

## 5. The Data Contract & Repo-as-Store
**Core:** the `module-0N.json` schema is the spine; the `courses/<slug>/…` repo layout is already the output format. Everything produces it; the player consumes it.
**What I bring:** we just designed and shipped this schema (including the image-forward `cinematic`/`card`/`narration` extensions). I know where it's solid and where it's ad-hoc.
**Decision recorded:** each image slide carries a `shadow_text` field — a natural-language description written once at generation time by a local model, immutable (regenerate image → regenerate shadow). It also rolls up into a human-readable markdown file for review. See `course-factory-local-model-ladder.md`; field design deferred to post-demo.
**Open questions:** git-as-database vs. a real DB with repo export? How does the schema version as courses diverge? Where does backlot/asset reuse live?

## 6. Architecture
**Core:** Laravel app, local-first for dev, job queues for the slow generation work, a human-in-the-loop dashboard, pluggable providers.
**What I bring:** less here — this is your Laravel turf (phonebooth). I can spec the AI-facing seams (where calls happen, what they return) more than the app scaffolding.
**Open questions:** queue/worker model for long generations; how the dashboard surfaces cost + approvals; local dev vs. hosted.

## 7. The Prompt / Skills Library — the moat
**Core:** the skills (sop-analyzer, script-writing, panel-logic, lxd, aesthetic-design) and the accumulated lessons are the defensible asset. The app is a harness around them.
**What I bring:** these skills ARE how I've been working; I can articulate what each one actually encodes and how it becomes an app module.
**Open questions:** how do skills version alongside the app? How does the lessons store feed back into the skills? What's protectable vs. commodity?

## 8. Security & Cost-Abuse *(Phase 2 design, Phase 3 load-bearing)*
**Core:** the moment untrusted users sit in front of expensive API calls, the app has a real attack surface — most of it pointed at *your wallet*.
**What I bring:** direct sight of where the money goes (generation) and where untrusted text enters the trusted pipeline (the uploaded SOP flows straight into the multi-agent prompts).
**Open questions:** **cost-abuse** — rate/spend caps per user, runaway-loop guards, upload-size limits so a user can't burn your budget. **Prompt injection** — a malicious SOP trying to hijack the agent prompts (the SOP is untrusted input that becomes part of a prompt). **Isolation** — tenant separation, API-key protection, per-user quotas. **Content safety** — what users are allowed to upload/generate. This thread pairs tightly with model-routing and the roadmap's unit economics.

---

### How to use this
Open a new conversation, name the thread (e.g. "Course Factory — thread 3, model routing"), and paste that block (or attach this file). I'll have enough to start without re-deriving everything. When a thread matures, it earns its own `course-factory-<aspect>.md` like the assembly one.

*One meta-note: the highest-value habit while we finish mold is to keep logging manual decisions as "button candidates" and Seedream lessons in a consistent shape. That hand-collected data is the real spec — the work writes the requirements.*
