# AUDIT-REMEDIATION — PR #85 (2026-07-24; ~15 min; paste to a builder session)

Per `courses/loto/AUDIT-2026-07-24-pr85.md` (Opus). Direct to `main`; the version-stamp
standing rule applies to step 2. Correction convention: fix in place + dated correction
note (per the `3b4aeb0` precedent and BUILD-LESSONS practice).

## 1. Fix the contrast table in `CHANGE-NOTE-demo-polish.md`

Six of eight rows were mis-transcribed from the audit JSON (390px label values pasted
into 1440 rows — e.g. note says 8.57 where the artifact says 8.34, 6.88 vs 7.11). The
auditor recomputed every row from stored sample pixels: the artifact is correct, all
AA-passing, 2.38 minimum margin. Replace the six values with the artifact's numbers
(`evidence/demo-polish` audit JSON is the source of truth) and add a dated correction
note. The change note is the durable record; it must match its own citations.

## 2. Make the chip's stacking honest on image slides

`.slide.has-image > *` still sets `z-index: 2` on the chip (its specificity beats the
chip's own `z-index: 3`; the position fix didn't re-declare it). Add `z-index: 3;` to
the existing `.slide.has-image .citation-chip` block. Impact is cosmetic-consistency
(scrim is at 1; chip already paints above it) — the point is that the stylesheet and
the change note tell the truth. Bump the asset stamp to `?v=2026-07-24b` in all three
shells (standing rule: same commit as any `chrome/` change). Then correct the change
note's "z-index unaffected" claim in place, dated.

## 3. P3 closure — blocked on Sean's selection

After Sean ratifies the shipped scene treatment (or names a swap — the alternates are
on `evidence/demo-polish`): update the change note's P3 row to record the selection
and its date. If he swaps, implement the swap first (stamp rule applies). This is the
last open item from the #85 audit.

## 4. Verify by read; report SHAs

Raw `main` shows the corrected table and the `z-index: 3` line; shells carry
`?v=2026-07-24b`; report commit SHAs.

---

**Queued, not this task** (append to the polish/tooling backlog): Reviewer-mode axis
for the capture sweep (the chip rule's deck-wide blast radius was never swept in
Reviewer mode — the #85 audit's structural-blindness finding), and run-provenance
fields (commit, viewport set, mode, timestamp) in every `tools/capture` JSON artifact.
