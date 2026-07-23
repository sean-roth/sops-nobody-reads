# WORKFLOW-TRACE — record → spec for app v0 — T12 addendum (2026-07-23)

Appended as a dated addendum to keep the morning's main-file churn low; fold into the
master trace at the next consolidation.

- **T12 — NL2BR handback verified; merge staged (PR #81).** Orchestrator · PR #81 file
  list + `player.js` patch + `CHANGE-NOTE-nl2br.md` (no images loaded — context care per
  Sean) · builder handback · verdict: **conforms** — the one-character fix (`/\\n/g` →
  `/\n/g`) plus honest comment updates confirmed in the patch; scope held to `player.js`
  + change note; 172 PNGs isolated in their own commit (`e340565`); consumer enumeration
  complete (5 heading render sites, 2 documented bypasses with zero-newline data);
  stark-cut `pre-line` interaction fully explained (why 28 headings change and 6 don't);
  word-multiset measurement artifact disclosed and superseded by the strictly stronger
  structural invariant · outputs: `CHROME-CSS-CLEANUP-QUEUED.md` committed (post-demo
  queue; orchestrator keeps the brief-writing seat) · gate: strip `e340565` (local
  revert — the MCP file tools cannot delete), then Sean's go → orchestrator
  squash-merges → publish.
  *App notes: (1) the builder held the merge back unprompted — gate ordering is becoming
  culture, not just instruction. (2) Commit-splitting gate artifacts (deliverable commit
  + strippable artifact commit) is the cleaner form of the convention — encode in the
  brief template. (3) The runner needs a delete-capable git transport; file-level write
  tools can't strip artifacts. (4) The change note falsified a standing code comment's
  claim ("invisible at teaching-caption/reveal scale") — handbacks can falsify existing
  annotations, so audits should diff change-note claims against standing comments, not
  just against code.*
