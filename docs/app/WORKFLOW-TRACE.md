# WORKFLOW-TRACE — record → spec for app v0

**What this is.** The manual LOTO build, instrumented. Every step we perform by hand gets a trace entry — seat, inputs, driver, outputs, gate — plus a note on what the app must do to perform that step. As entries accumulate, patterns harden into requirements; by demo-complete this reads as the v0 runner spec. Record first: nothing in here becomes design until it has happened by hand at least once.

**Why it lives here.** SNR now spans several repos; this file is the navigation spine and the single place where the app's shape accretes.

---

## System map (as of 2026-07-21)

**Repos**
- `sops-nobody-reads` — courses, governing standards (law), players, ledgers, this file. The app's home.
- `phonebooth` — outreach. `_agent/` is the sales system; `_agent/orchestrator/` is the working lead-gen pipeline (**the architectural precedent**, below); `_agent/strategy/app-v0-scope.md` is the client-facing v0 shell spec (DRAFT).
- `sopsnobodyreads-site` — the public site; serves the demo URL. Deployment path from a merged course build to `sopsnobodyreads.com/demo`: **open question** below.
- Per-client repos (future) — one repo per client; documents → HTML/CSS/images. Scale structure deferred until ~a dozen clients show the shape organically.

**Seats** (always separate contexts — decided 2026-07-21)
- **Orchestrator** — session state, sequencing, briefs, merge execution after the human gate. (Today: Fable in claude.ai; normally Opus.)
- **Builder(s)** — implement briefs on branches off `main` (never stacked); hand back branch + change note + screenshots. (Today: Sonnet in Claude Code.)
- **Auditor** — verifies a handback from the actual diff, never from the handback narrative; shares no context with the seat that wrote the brief. (Today: Fable, separate session.)
- **Human (Sean)** — domain appropriateness and sign-off. The AI guarantees source *fidelity*; the human owns *appropriateness*. In the client-facing app the client takes this seat for the rendered layer; the frozen source remains the authority over content.

## Precedent: the lead-gen orchestrator (`phonebooth/_agent/orchestrator/`)

A working instance of the pattern the course runner should inherit:
- **Code orchestrates; the model makes one bounded judgment at a time.** Transport, dedup, and output are plain code; the model is called per atom with strict JSON out.
- **Prompts are committed files** (`qualification-prompt.md`), versioned like code — not resident in anyone's context.
- **Model per seat is config** (`QUALIFY_MODEL` env var) — model-pluggable by construction.
- **Three-way decisions with a review pile** (keep / reject / review): ambiguity and upstream failures route to a human queue; they never silently pass and never kill the run.
- State there is SQLite; here state = the repo (git as database, reaffirmed 2026-07-21).

## Document types (the data model)

- **Standards** (`docs/standards/`) — law. Durability (source), Slide-Type v0.2 (structure), Build Methodology (process).
- **Frozen source** (`courses/<course>/sources/`) — content authority; the course renders it, never overrides it.
- **Brief** — orchestrator → builder task spec. *Pending: brief templates as committed files per pass type.*
- **Change note + screenshots** — builder → handback.
- **PR diff** — the auditor's ground truth.
- **Ledgers** — `ADDITIONS-LEDGER.md` (§8 additions), `BUILD-LESSONS.md` (each real error → the automated safeguard it implies).
- **Handoff** — serialized orchestrator state across sessions.
- **This trace** — record → spec.

## Decisions (dated)

- 2026-07-21 — This LOTO build doubles as **v0 of the self-service app**. Sean self-serves it until the first clients, then alpha testers.
- 2026-07-21 — Seat separation is absolute: auditor ≠ orchestrator ≠ builders, separate contexts always.
- 2026-07-21 — Form factor: **CLI for seat/agent management first; visual dashboard for viewing the rendered course**; unified GUI later.
- 2026-07-21 — **Git as database** reaffirmed; documents → HTML/CSS/images; one repo per client; scale deferred until ~a dozen clients.
- 2026-07-21 — Demo audience = **cold-call prospects**; the demo is the call's proof artifact (constraints below).

## Outreach constraints on the demo (from `phonebooth/_agent/README.md`)

- The call sends a prospect to **sopsnobodyreads.com/demo** — one URL, no login, likely opened **on a phone** in a shop office. Mobile rendering and page weight are demo-blocking concerns, not polish.
- Demo copy is a prospect-facing outreach surface and inherits the voice rules: plain, short sentences; say "onboarding"/"module," never "training"; never AI / blockchain / SCORM / LMS / "compliance" / "platform" / "solution." → **Needs an explicit voice audit** of the course menu and any intro copy.
- The demo must read as *a shop's own procedure, faithfully rendered* — the Learner/Reviewer citation toggle is the trust feature and should be discoverable without narration.

## Open items for the spec (running)

- **RECONCILE (needs Sean):** `app-v0-scope.md` scopes v0 to client-touching surfaces (Wizard-of-Oz rule: don't build what the client never sees), while the 2026-07-21 meta-task instruments exactly the unseen machinery. Proposed reading: the Wizard-of-Oz rule governs the *client-facing* build; the phonebooth roadmap rule (build only what a felt bottleneck demands) governs the *Sean-facing* machinery — and this trace exists to log which frictions are actually felt, so the runner is built from evidence, not appetite.
- **Deployment path:** how does a merged LOTO build reach `sopsnobodyreads.com/demo`? (Vercel autodeploys the site repo; courses live in this one.) Unverified.
- **Prompt storage:** each seat's prompt and each pass type's brief template as versioned files (inherit the lead-gen pattern).
- **Auditor cleanliness in-app:** fresh context per audit, enforced mechanically, not by convention.
- **Cost metering:** log Anthropic + Replicate spend per delivered module from day one (pulled forward from `app-v0-scope.md`).

## Trace entries

Format: **T# — step** · seat · inputs · driver · outputs · gate · *app note*

- **T1 — Session resume.** Orchestrator · HANDOFF-2026-07-21.md + durable memory · handoff protocol · state read-back + scoping questions · gate: human confirms scope. *App note: orchestrator boot is a deterministic doc-read, not model recall; the handoff format is already machine-followable.*
- **T2 — Scope decisions.** Human + orchestrator · T1 questions · — · the Decisions above + this file · gate: the human's answers. *App note: the decisions log is distinct from task state; decisions constrain all future briefs.*
- **T3 — Merge PR #79 (content pass).** Human · verified PR + screenshots · sign-off · merged to `main` · gate: human sign-off (domain appropriateness). *App note: merge is human-gated; the app may execute a merge, never initiate one.*
- **T4 — Context intake (outreach).** Orchestrator · phonebooth `_agent/` README, ROADMAP, orchestrator/, app-v0-scope.md · meta-task · outreach constraints + precedent pattern + RECONCILE item · gate: none (read-only). *App note: the orchestrator needs cross-repo read access; a deliverable's constraints can live in a different repo than the deliverable.*
