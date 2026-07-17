# The Build Methodology

Operational companion to the Durability Standard.
Version 0.1 — 2026-07-16

## Preamble: What This Document Is

The Durability Standard is the constitution — it defines *what* a durable course is (the atom schema, source acceptance, the four passes, the acceptance test) and *why* each rule exists. This document is the operational layer: *how* a build is actually run, end to end, and the process discipline that keeps a build from failing in the ways ours failed before this methodology existed.

The Standard tells you the invariant. This tells you the workflow that holds it — and, as importantly, catalogs the specific ways that workflow leaks, because every leak below was paid for in a real build.

The one-line north star, from which everything else follows:

> **Render from source. Never create source.**

A course is a *rendering* of an authoritative document into a form a learner can absorb. It is not new source material. Every failure this methodology guards against is, at root, the system creating source — asserting something the frozen document does not say — instead of rendering what it does. The question is never "is this true?" but "does the frozen source say this, and can I point to where?"

## §M1 — The Workflow

A build runs in this fixed order. Later stages render *from* earlier ones; an earlier stage is never edited to match a later one. When an upstream artifact changes, everything downstream is **regenerated**, not hand-patched.

1. **Freeze the source** (§M2). Before a single word of content is written, the authoritative source is fetched, verified current, provenance-stamped, checksummed, and committed. No content work begins against an unfrozen source, and nothing is ever written from memory of a regulation.
2. **Render the script from the frozen source** (§M3). Prose is written *from* the frozen text. Every claim that asserts a fact carries a `source_ref` pointing to the exact paragraph, verified verbatim.
3. **Decompose the script into the build (JSON).** The script is sliced into the module data structure (the decomposition stage — the LXD skill). This is a *structural* transformation, not a content one: it adds, removes, and rewords nothing. Every `source_ref` carries through.
4. **Render the player from the build.** The JSON becomes the delivered HTML player (the presentation stage — the aesthetic-design skill), including the citation feature that renders each `source_ref` back to the learner or reviewer.
5. **Images — last, and optional.** Visuals are supporting cast. A slide with no image and a correct, cited claim outranks a beautiful slide that is subtly wrong. Images are generated only after the content is source-final; labeled diagrams are built *in the player*, not generated, because generators mangle text.
6. **Audit, fix, re-audit — to a clean verdict** (§M4).
7. **Ship gate.** Nothing reaches a prospect until an independent audit returns a clean verdict *and* every decision record is signed.

The ordering is load-bearing. A build layer drifts from its script the moment a human or model edits it directly; the only safe edit to a downstream layer is to regenerate it from a corrected upstream one.

## §M2 — Source Freeze (the First Gate)

The founding failure of the original course was that it was built from a "sample written program" — a derivative that paraphrases the regulation — instead of the regulation itself. The freeze exists to make that class of error impossible.

**Find the authoritative source, not a PDF.** A PDF is a snapshot with no way to prove it reflects current law, and most documents that surface are derivatives (training modules, sample programs, vendor explainers, university handouts) that paraphrase rather than reproduce. The date on a derivative is irrelevant; it is the wrong *kind* of document at any date.

The hierarchy of authority for U.S. federal regulation:

- **eCFR (ecfr.gov)** — the continuously-updated official codification. It carries a live "up to date as of" stamp, a point-in-time timeline showing when the content last changed, and the Federal Register amendment trail. This is the primary frozen source. Currency is *proven*, not assumed: read the "up to date as of" date, the timeline, and the amendment citations.
- **govinfo.gov Published Edition** — the official annual print CFR. Citable, but lags; a backstop.
- **The agency's own page (e.g. osha.gov)** — a reproduction, useful as an independent cross-check, not the code of record.
- **Rejected as source-of-truth:** any derivative — training modules, sample programs, explainers. Fine as commentary, never as the frozen source.

**Freeze cross-referenced standards too.** When the source borrows a term defined in another regulation, that regulation is frozen as a second source. (A term can *describe* a real thing while being *filed under the wrong standard*: the course wrongly taught "qualified person" as a lockout role when it is defined in the electrical standards — the reframe required freezing 1910.399.)

**Provenance and integrity, per Durability Standard §2.2.** Each frozen file is committed as pure source text — no added headers, so its checksum stays stable — beside a separate provenance record holding: citation, source URL, the "up to date as of" date, last-amended date, fetch timestamp, and a SHA-256 of the file. Cross-check the frozen text against a second independent rendering (e.g. the agency page) on the load-bearing passages. An identical typo across two independent fetches is positive proof they render the same underlying text.

**Fetch to disk, never through the model.** The bytes of a large source are pulled straight to disk (curl / API), not fetched-then-written by the model — routing source text through the model's own output is both a fidelity risk and, past a few kilobytes, a hard failure. This is a tooling constraint with a fidelity payoff: the source lands unmediated.

## §M3 — Rendering Discipline

**Every factual claim carries a `source_ref`.** The reference has three parts: the citation string (e.g. `29 CFR 1910.147(d)(5)(ii)`), a deep link to the exact paragraph, and a *verbatim* anchor — text quoted exactly from the frozen file. Before any claim ships, its anchor is confirmed to grep-match the frozen file. A claim that cannot be anchored does not ship.

**Anchors are verbatim, one span each.** An anchor is exact quoted source text — never a paraphrase, and never a paraphrase wearing quotation marks. Where a claim rests on two provisions, the anchor holds two separately-quoted spans, explicitly marked as separate, never stitched into one false continuous quote. (Anchor grammar — whitespace, embedded commentary, composite anchors — is a recurring drift point. The precise anchor schema belongs in the Durability Standard's atom schema; per-artifact flagging has repeatedly failed to converge it.)

**Regenerate downstream; never hand-patch the build.** A build layer accumulates its own drift independent of the script — in this project a build once carried a different, also-wrong energy taxonomy and a fabricated ending the script never contained. The only safe correction to a build or player is to fix the script and regenerate. Hand-patching a downstream layer treats a symptom and hides the divergence.

**The citation feature is the product, not decoration.** The player renders each `source_ref` as a citation chip behind a Learner / Reviewer toggle (default Learner: chips hidden; Reviewer: chips shown, each linking to the regulation). This makes "rendered from source" *checkable* by a buyer in the room. The hard rule: a rendered citation must verify against the frozen file — a wrong citation is worse than none, especially in a compliance sale. The roadmap extends the loop: `source → course → cited back to source` becomes `company SOP → course → cited back to the SOP`, closing a loop no generic course can offer.

## §M4 — The Audit Loop

**The audit is adversarial and independent (Durability Standard §9).** An auditor's job is to *find* what is wrong, not to confirm it is right. The auditor is a fresh instance that did not write the course or the fixes; the fixer never self-certifies. The detailed procedure — six passes and two guards — lives in the course-audit skill. This section states only the loop and the two disciplines that make it work.

**Pre-audit self-check: clear the whole surface before handoff.** This is the single change that turned the loop from a grind into convergence. For the first several rounds the independent audit was doing double duty — it was both the *gate* and the *first discovery* of our own misses — so each round surfaced one blocker at a time. The fix: the fixer/reviewer runs the full audit themselves (all passes, all guards, whole surface, claim level) *before* handing off, so the independent audit *confirms* a cleared course rather than discovering an uncleared one. When the self-check is genuine, the independent audit comes back clean on its first full pass.

**The loop:** self-check → independent audit → fix from source → regenerate → fresh re-audit → repeat until a clean verdict. Then, and only then, the ship gate.

**A clean verdict is the exit, and it is real.** Rounds of blockers followed by a clean verdict — here, two re-audit rounds with blockers and a clean third — is convergence, not luck, *provided each round the checks got wider, not just the fixes*. If a round returns a genuinely new-class blocker on a surface the self-check claimed to clear, that is the signal that the *pipeline itself* is suspect, and the response is to redesign it, not patch again.

## §M5 — Process Discipline (Failure-Mode Guards)

Each rule below prevents a specific failure this project actually suffered. They are not style preferences; they are scar tissue.

**Branch off `main`; base every PR on `main`; never stack.** A stacked PR — one based on another PR's branch — produced a repeated merge failure: the child PR was first closed without merging, then on a second attempt merged *into its parent's branch* while GitHub reported "successfully merged and closed," so its content never reached `main`. When work depends on unmerged work, merge the dependency and branch fresh. Do not stack.

**Gate on topology before building or auditing on a merge.** A PR reported "merged" may not have reached `main` (wrong base, unmerged child, replication lag). Before treating content as landed — especially before pointing an audit at it — confirm with an ancestor check (`git merge-base --is-ancestor <branch> origin/main`) *and* by reading the content on live `main`, not a local clone. (A stale local clone once misrepresented `main`'s state, masking which fixes had actually landed — which is why the check reads live `main`, not a cached copy.) An audit run against a stale premise is worse than no audit.

**Make every check as wide as the invariant.** The invariant is not "does this claim match the source" but "does the whole deliverable, in order, across every file and every layer, still obey the source." Each narrowing of a check was a leak:

- *Whole-surface scope.* Sweeps scoped to `scripts/` + `builds/` let a phantom source line survive in the README through three audits — the first file a buyer opens. Sweep the entire deliverable: every file a buyer or learner can open, including the README, decision records, manifests, and prompt files. Records *of* the errors (audit docs, session logs) are excluded.
- *Claim level, not section level.* A completeness check at section-header granularity self-reports clean while individual claims are silently dropped. Verify every taught claim — cited or not — survives into every layer.
- *Both directions.* Check for content in the build absent from the script (fabrication) *and* content in the script absent from the build (loss). This project's regressions were losses.
- *Order, not just presence.* Where the source mandates a sequence, a step that is present but mis-ordered is still a violation. (The final blocker was a correct, sourced notification placed one step too late.)
- *All layers, including non-obvious ones.* Any string a learner can read is a content layer — including hardcoded feedback strings in the player's JavaScript, which went unaudited for several rounds.

**Run a regression check every fix.** A fix can delete or displace previously-correct content. Diff the content a prior audit verified as present against the current build; report anything now missing. Two of this project's blockers came from fixes going wrong: one deleted a required notification step, and the very fix that later restored it placed it in the wrong order.

**A human signs decisions.** Where the source conflicts with itself, or a scope boundary must be drawn, the resolution is recorded and *signed by the accountable person* (Durability Standard §5 / §7). A model may apply a resolution, but the record must show a human ruled — the repo must never represent a package as decision-complete while a decision record still reads "pending."

## §M6 — Named Tells

These heuristics recur across audits; the full catalog and their use live in the course-audit skill. In brief:

- **Memory-blend error** — the founding failure class: a true-sounding claim given false authority ("OSHA recognizes five types," "four employee roles," "master keys are prohibited"). The idea may be reasonable; the attribution to the source is invented.
- **Reframe-is-a-finding** — if you catch yourself mentally rewording a claim to make it defensible, that is a finding, not a fix.
- **Partial-check miss** — verifying one claim in a section does not clear the section; the four-roles error hid beside a sibling claim that had "checked out."
- **Build-guilty-until-proven** — never assume a build matches its script.
- **Mis-attribution** — a claim can describe a real thing while filing it under the wrong standard.
- **Numbers guilty until grep-proven** — every figure is verified against the source or removed.
- **Shared-typo proof** — an identical typo across two independent fetches confirms they render the same underlying text.

## §M7 — Document Map and Roadmap

This methodology is one of a small set:

- **The Durability Standard** — the constitution: atom schema, source acceptance, the four passes, the acceptance test, conflict log, signers. The *why* and *what*.
- **This Build Methodology** — the operational *how*: the workflow, the source-freeze protocol, rendering discipline, the audit loop, and the process guards.
- **The course-audit skill** — the executable audit: the six passes, the two guards, and the named tells in full.
- **The positioning doctrine** — the honest-claim principle: a course *teaches the standard, accurately and cited*; it does not "ensure compliance," because compliance is workplace-specific and belongs to the employer. Marketing claims obey the same "render, don't create" rule as course claims.

**Roadmap.** The citation loop closes further when a client's own SOPs become a frozen source, so the delivered course cites back to the company's own documents — the full loop.

---

*Version 0.1 — 2026-07-16. Captured from the LOTO build, which reached a clean audit verdict on its third re-audit round. Provisional: to be revised as later builds test these rules, and as the anchor-grammar schema and the topological merge gate are absorbed into the Durability Standard and the tooling, respectively.*
