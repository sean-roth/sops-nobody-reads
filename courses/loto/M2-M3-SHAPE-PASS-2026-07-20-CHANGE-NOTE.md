# LOTO Modules 2 & 3 — Shape Pass + Chrome Fixes — Change Note

**Date:** 2026-07-20
**Branch:** `claude/m2-m3-shape-pass-2026-07-20` (off `main`, not merged — live demo unchanged pending sign-off)
**Built to:** `docs/standards/SLIDE-TYPE-STANDARD.md` v0.2
**Ported from:** the merged M1 pass (PR #77) — same selector fixes, same shape CSS/`render()` mechanism, same scoped `nl2br` fix. Not reinvented.
**Screenshots:** `courses/loto/M2-M3-SHAPE-PASS-2026-07-20-screenshots/`
**Scope:** Modules 2 and 3 only. No menu job (that was M1's Job C, already done). The known content items stay out.

Content is frozen and verified the same way as M1 — an automated leaf-string diff, not just a read-through. Module 2: 136 original strings, all 136 present verbatim after the pass; the only "missing" ones are the 7 literal `"concept"` type tags (renamed to `"definition"`). Module 3: 210 original strings, all 210 present verbatim; "missing" are the 9 `"concept"` type tags plus one dropped image path (`img/s10-shift-overlap.jpg`, the stark-cut that goes clean-ground — see below). Zero unexplained new strings in either module.

---

## Job A — the on-image washout

Confirmed at the same three lines the brief named, in both players — `.slide.has-image .slide-reveal h2` / `.slide.has-image .slide-reveal .body` / `.slide.has-image .slide-options h2`, all descendant where they needed to be compound. Fixed identically to M1. Audited every other `.slide.has-image …` rule in both files by hand; no other instance broken.

**Module 2 has no content to prove this against.** Every `reveal` in M2 is imageless (5 of them, none with an image field), and M2 has no `options` slide. The fix is made — it's a latent defect in the shared player, and correctness shouldn't depend on whether current content happens to exercise it — but it can't be screenshotted against real M2 content. Flagging this rather than inventing a test image.

**Module 3 proves it twice.** `reveal` idx26 ("The difference is thirty seconds and a padlock," `img/s15-course-complete.jpg`) keeps its default reveal shape — unaffected by any reshape, so it isolates the CSS fix exactly like M1's idx14 did. `reveal` idx3 also had the bug and also got reshaped (see Job B) — its before/after shows both the fix and the new shape at once. M3 also has a real `options` slide (idx8, "Who Gets Told, When") — the first actual instance across all three modules — so the options fix is now screenshot-verified, not just inspected.

---

## Job B — the shape axis

Ported M1's `shape` field, the generic `slideClasses += ' shape-' + slide.shape` hook, the figure/sequence/stark-cut CSS, and the `nl2br` scoped fix (`white-space: pre-line` on `.shape-stark-cut h2` only — the deck-wide `nl2br()` no-op is still not fixed broadly; same reasoning as M1, still out of scope here). No figure shape in either module — neither brief nor content offered a quantity-led trigger, and none was forced.

### Module 2 — two stark-cuts, a deliberate bookend

| Heading | Shape | Notes |
|---|---|---|
| "A sign is not a lock." (idx2) | **stark-cut** | The setup — the question the module poses. |
| "A sign is a request. A lock is a fact." (idx20) | **stark-cut** | The payoff — the module's thesis, in its closing reveal. |

**Judgment call, decided, flagged:** the brief offered a third candidate, "Your lock. Your key. Your guarantee." (idx10) — not chosen. Reasoning: all three candidates share the same parallel-clause construction, and stark-cutting all three would read as "every strong reveal gets the same treatment" rather than a deliberate beat. idx2 and idx20 use the literal same "sign / lock" phrasing at opposite ends of the module — isolating both creates a rhyme (pose the distinction, then resolve it) that idx10 doesn't share with either. idx10 stays a standard reveal. Net: 2 of 22 slides reshaped, 18 slides apart — no rhythm risk.

Neither candidate carried an image, so no image was dropped for either.

### Module 3 — one sequence, two stark-cuts

| Heading | Shape | Notes |
|---|---|---|
| "Before It Restarts" (idx6) | **sequence** | Confirmed order-bearing before applying the shape — 7 items, each step in this shutdown-reversal checklist depends on the one before it (inspect → clean up → replace guards → check controls → check personnel → remove lock → notify), and the source citation is explicit that the notify step must come last ("before the machine restarts, not after"). |
| "New lock on. Then old lock off." (idx3) | **stark-cut** | Background image (`img/s10-shift-overlap.jpg`) dropped for a clean ground, same treatment as M1's confirmed case. Body kept verbatim, de-emphasized on the same slide. |
| "Six sources. Six steps. Three roles." (idx27) | **stark-cut** | The brief's strongest candidate — the whole course's closing recap, three-beat parallel structure, no image to begin with. This is a `teaching-caption`, not a `reveal` — stark-cut is available to both per §S4, and no render() special-casing was needed: the shape is pure CSS keyed off the `shape-stark-cut` class, so any type that already emits kicker+h2+body can host it. |

**Judgment call, decided, flagged:** the brief's third stark-cut candidate, "The difference is thirty seconds and a padlock" (idx26), was **not** chosen — it sits immediately before idx27 (idx26 → idx27, back to back), and both briefs are explicit that two stark-cuts never run in a row. Between the two, idx27 is the stronger case (the brief calls it out directly as strongest, and it closes the entire course, not just the module) and idx26's callback→scene→reveal payoff structure reads perfectly well as a standard reveal — it's already doing real work isolating the fixed washout bug (see Job A). Net: 3 of 29 slides reshaped, well-spaced (idx3, idx6, idx27).

### The 7-item sequence needed a small CSS generalization

M1's sequence was a single fixed 3-column grid, which lays 7 items out as 3+3+1 — a lone item stranded on its own row. Sean asked for 3+4 instead, since there's margin to spare in the row width. Rather than hardcode a one-off "7 items → this exact layout" rule, `render()` now computes the row split generally: `seqRows()` groups items into rows of 3, and if that would leave exactly one item dangling on its own trailing row, folds it into the row before instead (3+3+1 → 3+4). Each row renders as its own independent grid (column count set inline per row), so the connector CSS simplified to a plain `:not(:last-child)` — no more nth-child row-size arithmetic, and it's correct for any item count without further tuning. Ported identically into all three players (M1's 6 items still lay out 3+3, unchanged — verified pixel-for-pixel — since 6 divides evenly and nothing needed folding). Screenshot-verified in both modes: the 7-item case now reads 3+4 with connectors only within each row and none dangling.

### `concept` → `definition`

Same mechanical rename as M1 — `type` field in both `.json` files and both embedded `MODULE` consts, the `render()` case, and the CSS class names (`.concept-box`→`.definition-box`, `.concept-label`→`.definition-label`). No reclassification judgment made on any individual slide (e.g., M3's "The Gap," which reads more like a narrated complication than a sourced definition) — that's the same deferred content-pass question M1 flagged, not resolved here.

---

## Content-preservation detail

Beyond the automated string-leaf diff (above), the two structural changes were checked by hand:
- M3 idx3's dropped image path: the file `img/s10-shift-overlap.jpg` is untouched on disk, only the slide's reference to it was removed, identical to how M1 handled `s13-two-minutes-padlock.jpg`.
- No heading, body, kicker, label, or citation text was reworded, cut, or added in either module — every diff line is a `type` rename, a `shape` field addition, or the one image reference removal.

---

## The gate

Every container type in both modules was screenshotted in both modes, using each type's actual instances (with and without image, where both states exist in that module's own data — see Job A for where they don't). Coverage is by container type × image-state × mode, same interpretation of "not a sample" as M1's change note explained (type-level, not literally every repeated instance of an unchanged type).

- **M2:** 13 stops × 2 modes = 26 after-screenshots — title, scene, definition (image-only, no no-image instance exists), teaching-caption, reveal default, reveal stark-cut ×2, consolidation grid ×2, callback, quiz, close.
- **M3:** 17 stops × 2 modes = 34 after-screenshots — title, scene ×2 image-states, definition ×2 image-states, teaching-caption ×2 image-states + stark-cut, reveal default ×2 image-states (image-state proves Job A) + stark-cut, sequence, options, callback, quiz, close.

Checked against the four criteria in §6:

1. **No on-image text washed out, AA on the composite, both modes** — confirmed for every has-image container that exists in each module (M3 proves this directly; M2 has none to prove it against, flagged above).
2. **Every reshape reads clearly as its shape** — 2 stark-cuts (M2) + 1 sequence + 2 stark-cuts (M3), all screenshot-verified in both modes, including the 7-item sequence's orphan-row handling.
3. **Register hierarchy intact** — unaffected by this pass in both modules; not separately re-verified beyond the existing containers screenshotted above (M2/M3 have no `misconception-held-up` slide to check against, unlike M1).

**Not done:** the live demo is unchanged. That only updates after Sean signs off on this set.
