# Course Factory — Architecture Direction

**Version:** 0.2 (direction, not design — nothing here has been executed)
**Status:** Speculative on purpose. This document gives the demo-creation and build conversations a starting frame so the reasoning doesn't get reconstructed from memory. Expect the mold rebuild (Phase 0's first real job) to revise it.
**Companion:** [`docs/standards/DURABILITY-STANDARD.md`](../standards/DURABILITY-STANDARD.md). The standard defines *what must be true* of any Source of Truth and course; this document sketches *what runs it*. Where they conflict, the standard wins.
**Home:** `docs/product/`, alongside the earlier course-factory design docs (`course-factory-ideation-v0`, `course-factory-roadmap`, `course-factory-threads-index`, `course-factory-assembly-review`, `course-factory-local-model-ladder`, `course-factory-tier1-describer`).

---

## The Frame

The recurring question — *is this a harness around a model, or a web app with AI capabilities?* — has a third answer, and it's the right one:

**A state machine around a repository, where AI calls are batch workers between gates.**

The nearest existing genre is CI/CD: a pipeline with stages, artifacts, blocking approvals, and an audit log — except the thing moving through the pipeline is knowledge instead of code. There is no chat surface anywhere in the product. The model-facing surface (Claude operating on the repo) and the human-facing surface (clients reading and signing gate artifacts) are different views over the same repository, not one program.

Consequences of the frame:

- Every operation is either a **batch job** (a pass, an audit, a diff) or a **signature** (a human gate). Nothing is realtime, nothing is session-shaped.
- The pipeline is *supposed* to block for days waiting on a client (Durability Standard §5, stall default). Long-lived, resumable, interruptible state is the design center, not an edge case.
- "Progress" is always a commit. If it didn't get committed, it didn't happen.

---

## Principle: The Repo Is the Database of Record

The Durability Standard makes the git history the evidence chain — frozen sources, checksums, signatures, decision records are legally load-bearing. Therefore:

- **Atoms are files** in the engagement repo (YAML one-per-atom, or JSONL per source — Phase 0 decides which). Human-diffable, commit-attributable, readable with `cat` forever.
- **Gate artifacts are markdown** rendered from repo state. **Signatures are small committed files**: artifact checksum + signer + role + timestamp.
- **Anything queryable is a derived index.** Coverage tiers, conflict status, atom-level diffs across source versions — these want queries, so a SQLite index is built *from* the repo, rebuildable at any time, authoritative never. If index and repo disagree, the repo wins by definition.

This resolves "queryable" vs. "immutable evidence" without compromising either, and it means a discovery request or a skeptical auditor can be answered with a git log, not a database export.

---

## Phasing

### Phase 0 — Paper + scripts + Claude Code (now; the mold rebuild runs on this)

No Laravel. No server. The standard itself says the app waits until the paper gate artifacts have been used in a real engagement — and the paper version *is* an architecture:

- **Repo schema:** directory conventions for an engagement (sources/, atoms/, conflicts/, decisions/, gates/, course/), the atom file format, gate-artifact templates as markdown, signature-record format.
- **A handful of Python scripts:** build the SQLite index from atom files; compute coverage tiers (asserted / taught / assessed) against course and quiz files; diff atoms across source versions; emit the double-extraction reconciliation report.
- **Claude sessions as workers** — via Claude Code, operating on the repo directly — executing passes per the standard.
- **The founder as the gate mechanism** — reading artifacts, committing signature records.

Everything Phase 0 stabilizes becomes the spec Phase 1 implements rather than invents. If the atom format is wrong, it gets found in a text editor, not a migration. (Manual-before-automation, applied to our own product.)

### Phase 1 — Operator console (founder-facing)

**Trigger:** the founder's own verification workload — when confirming pipeline state by hand (which gates are satisfied, which atoms are blocked, coverage status per module) becomes slower or less trustworthy than a tool.

Decided 2026-07-06: the first half dozen clients never touch software. Docs in, course out. The first iteration of the app exists to make the founder's workflow **easier and verifiable** — an operator console, not a client product. Consequences:

- It can be minimal and private. It may not need a running server at all: a report generator that renders the SQLite index into static HTML dashboards (pipeline state, gate status, coverage tiers, blocked atoms) may be enough for months. A web framework is justified only when something must accept input from a browser — and even then it is one founder's auth, not client accounts.
- Client signatures in this phase are **emailed gate artifacts, signed and returned, committed to the engagement repo** with checksum. The paper gate mechanism from Phase 0 simply persists; the console only *displays* whether each gate is satisfied — it is never itself the gate.
- Pass execution remains founder-operated (Claude Code under the existing plan). No metered server-side jobs, no queue infrastructure, no billing code.

**The discipline (unchanged):** tooling orchestrates and displays. It never becomes where truth lives. Every write is a commit.

### Phase 2 — Client-facing gates, metering, self-service

**Trigger:** the first moment a client must click Approve without the founder in the loop — which, per the decisions below, coincides with self-service and is months out at minimum.

This is where Laravel fully earns its place: auth and signer identity, gate artifacts rendered from repo markdown (Blade), Approve actions that write signature records back to the repo, queued jobs for pass execution (queues map cleanly onto "two independent extraction jobs → reconciliation job → block on human"), and the boring, well-trodden per-engagement state machine. **Metered billing begins here and only here** — clients triggering work without the founder is what makes server-side, per-token API jobs exist. The gate artifacts designed on paper in Phase 0 become the screens, per the standard (§7) — "buttons at human gates" means these documents with an Approve button. Do not design this phase before Phase 1 has survived several clients.

---

## The Model Layer: Per-Pass Policy Behind One Interface

The Durability Standard dictates the shape — different passes want different intelligence, and some relationships between models are *required*:

| Pass / job | Wants | Constraint from the standard |
|---|---|---|
| Pass 1 extraction | Literal, cheap, eventually local | Double-extraction requires **engineered independence**: different models, or different renderings (text layer vs. OCR of page images), or materially different chunking (§4) |
| Pass 0 page description | Local multimodal (describe-then-reason ladder, already proven) | Descriptions immutable once written |
| Pass 2 / Pass 3 | Frontier reasoning | Human sign-off per pass |
| Image pipeline | Replicate (Seedream, locked Tier-1 describer) | Existing locked prompts govern |
| Adversarial audit (§9) | Frontier | Auditor must be **independent of whatever produced the course** — different model or clean context, and it runs against raw frozen sources, not the atom layer |

So the API layer is a **router with a policy table** — pass type in, model + params out. Anthropic API for frontier work, Replicate for images, Ollama for the local ladder. This is the third instance of the same router idea in this shop (Clara; the Joi cluster design); the convergence is evidence the architecture is real. Build it once as a small library the Phase 0 scripts call now and the Phase 2 server jobs call later.

---

## Deliberately Absent

- **No chat UI.** Clients read artifacts and sign. Claude operates on the repo. Conversation happens in Claude Code during production, not in the product.
- **No realtime.** No websockets, no live progress. Batch jobs and signatures only. An architecture built around blocking-for-days will age better than anything session-shaped.
- **No model-centric core.** Models are replaceable workers behind the policy table. The repo schema and the gate mechanics are the product; the standard survives every model swap.

---

## The Open Problem the Sketch Skipped: Confidentiality

The mold demo is public-domain EPA, so this never surfaced — but the actual product ingests **confidential internal SOPs and interview recordings in which employees say candid things**, then (as sketched) ships them to third-party APIs.

Before client one, this needs:

1. **Contract language** on processing: which providers touch client data, under what terms. → Add to the counsel agenda (Durability Standard §11).
2. **Verified provider terms.** Data-handling and retention terms for the Anthropic API and Replicate must be **verified against current published terms at decision time, not asserted from memory** — this is exactly the failure class the standard exists to prevent.
3. **A product-tier question worth taking seriously:** the local-model investment (describe-then-reason ladder, Ollama infrastructure) makes *"your documents never leave hardware we control"* a genuinely offerable tier — extraction and description run local, frontier passes either run on redacted/derived text or are priced as a client-approved exception. Most competitors cannot offer this. Decide whether it's a tier or the default for elicitation recordings specifically (which are the most sensitive artifact in the whole pipeline — see §11 informant protections).

---

## Decisions (formerly Open Questions)

Converted to decision records 2026-07-06, per the shop's own doctrine — decided by the founder, recorded with rationale:

1. **Payment model:** metered billing exists only at self-service (Phase 2), months out at minimum. Until then, all pass execution is founder-operated under the existing Claude plan. Consequence: Phase 1 has no job queue and no billing code.
2. **Client software exposure:** none for roughly the first half dozen clients. Docs in, course out; client signatures by emailed gate artifact, signed, returned, and committed with checksum. Consequence: near-term build effort goes to repo schema, scripts, and the operator console — Laravel (or any server) is deferred until Phase 2's trigger.
3. **Repo topology:** one repo per client engagement, plus a shared `course-factory-tools` repo the engagement repos consume. Rationale: clean confidentiality boundaries, per-client access control, and a deliverable that can be handed over or destroyed wholesale at contract end.

No open questions currently gate Phase 0. The next unresolved item is the confidentiality/provider-terms work above — which gates client one, not the mold rebuild.

---

## Version History

- **0.1** — Initial direction, written at the end of the Fable design sessions that produced Durability Standard v0.1. Frame: state machine around a repository; repo as database of record with derived SQLite index; three phases with explicit triggers; per-pass model policy router; confidentiality flagged as the pre-client-one open problem. Unexecuted.
- **0.2** — Founder decisions incorporated same day (payment model, client software exposure, repo topology); open questions converted to decision records. Phasing restructured: Phase 1 redefined as a founder-facing operator console (possibly serverless — static reports over the index); client-facing gates, Laravel, and metering merged into Phase 2 with self-service. Net effect: the near-term build got smaller. Still unexecuted; expect the mold rebuild and the first client to revise it.
