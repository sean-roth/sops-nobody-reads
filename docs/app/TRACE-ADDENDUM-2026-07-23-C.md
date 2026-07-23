# WORKFLOW-TRACE — record → spec for app v0 — T20–T22 addendum C (2026-07-23)

Fold into the master trace with addendums A and B at the consolidation during the reflection session.

- **T20 — PR #84 handback: the instrument outranked the brief, twice.** Builder ·
  brief + repo + its own new measuring tools · MOBILE-READABILITY brief · built the
  overflow audit FIRST, ran it before fixing, and believed the measurements over the
  commissioning narrative: (1) slide 25's real defect was **horizontal** overflow
  (auto-fit grid sizing to its own max-width inside a center-aligned flex parent,
  spilling cards off both edges — a defect class the brief, the orchestrator, and the
  original audit design all missed; H-overflow detection now permanent in the tool);
  (2) the brief's nominal viewports didn't reproduce slide 20's clipping — Sean's
  device was ground truth, so browser-chrome-reduced stress viewports (390×704,
  360×660) were added and disclosed. Also verified `safe center` empirically in two
  engines before shipping it. Results: M1 240/240 clean incl. stress dims; deck-wide
  36→2 clipped, both in coming-soon modules, both scroll, zero stuck. Orchestrator
  eyes-on: PASS (slide 20 renders Sean's 1·2/3·4/5·6 exactly; slide 25 two clean
  columns, both modes).
  *App note — **named principle, per Sean's explicit request that this be documented
  as a feature of the future app**: "THE BRIEF IS A HYPOTHESIS." Every seat treats
  its commissioning prompt as data to be verified against reality, not as ground
  truth; instruments outrank narratives, and a seat that finds its brief wrong
  reports the finding instead of complying with the error. The runner must (a) hand
  every builder the measuring tools before the fixing tools, (b) treat
  brief-contradicting measurements as first-class outputs routed to the orchestrator,
  (c) version the instruments so each pass inherits the last pass's detection
  classes. Today the instrument gained horizontal-overflow detection and realistic
  viewports because a builder distrusted an exact tie — that compounding is the
  feature.*

- **T21 — Sean merged #84 pre-strip (n=3) → convention changed to fit the human.**
  Human · impatience + a merge button that looks finished · — · #84 on `main`
  including 24 PNGs + 2 large audit JSONs (verified by read; `tools/capture` also
  confirmed landed, closing that auditor point) · gate: exercised; audits pending.
  *App note: three merges in one day absorbed gate artifacts because the strip step
  is a ritual that competes with human momentum — after n=3, the verdict is that the
  ritual is the defect, not the human. **Convention change, effective next pass:
  gate artifacts never enter the PR branch.** They push to a dedicated
  `evidence/<pass>` branch (never merged; linked from the PR body), so there is
  nothing to strip and the merge button is always safe. Design rituals out, not in —
  the runner should make the wrong action impossible rather than the right action
  remembered. Cleanup: one prune commit removes all three `screenshots/` dirs from
  `main`'s tree (housekeeping pass).*

- **T22 — DEMO COMPLETE (2026-07-23, confirmed on device).** Human + all seats ·
  the day's seven merges · — · sopsnobodyreads.com/demo is prospect-ready: one
  shared audited chrome; headings render as written; Module 1 live with M2/M3
  coming-soon; close screen routes to the menu; stark-cut scale fits; phone nav
  collapsed into the ⋯ popover; zero clipped-and-unreachable content across 240 M1
  checks · gate: Sean's device check, passed. Remaining work is explicitly
  non-blocking: audit sitting (#81, #82, hotfix, #83, #84), housekeeping (prune ×3,
  asset version-stamping, branch deletion, evidence-branch convention), polish pass
  (CHROME-CSS-CLEANUP-QUEUED, now carrying the backlog incl. Sean's scene-text
  legibility note — a design decision staged for his eyeball, not a silent fix).
  Then the reflection session: fold addendums A–C into the master trace and begin
  the app spec from it.
  *App note: the demo was finished by a loop that today alone grew plan-first
  commits, an overflow instrument, evidence discipline, a hotfix lane, a visual
  gate, and a named epistemic principle — all recorded, all reusable. The reflection
  session's job is extraction, not invention.*
