# LOTO Modules 2 & 3 — Shape Pass + Chrome Fixes

**Date:** 2026-07-20
**For:** a Sonnet instance with repo access (GitHub MCP) and a Playwright-capable browser.
**Governing document:** `docs/standards/SLIDE-TYPE-STANDARD.md` **v0.2** (on `main`). Build to it.
**Reference implementation:** the **merged M1 pass** — `courses/loto/builds/module-01/index.html` on `main` (PR #77). It already contains the fixed selectors, the figure/sequence/stark-cut shape CSS and `render()` support, and the scoped `nl2br` fix. **Port those patterns; do not reinvent them.**
**Scope:** Modules 2 **and** 3, same recipe as M1. Pure presentation — content frozen (claims verbatim; verification is content-preservation, not just a type diff). No menu job this time (the course menu was M1's Job C, already done). The known content items stay **out**.

---

## 1. Read first

1. `docs/standards/SLIDE-TYPE-STANDARD.md` v0.2 — §S3 (shape triggers), §S4 (catalogue), §S5 (chrome / scrim / composite-contrast / gate).
2. **`courses/loto/builds/module-01/index.html`** — the reference. See how the three shapes render, how the on-image selectors are written (compound, not descendant), and how `white-space: pre-line` is scoped to the stark-cut.
3. The targets: `module-02/index.html` + `module-02.json`, and `module-03/index.html` + `module-03.json`.

---

## 2. Job A — Fix the on-image washout (confirmed present in both)

Same bug M1 had, confirmed at the **same three lines in both M2 and M3 players** (305, 413, 422):

- `.slide.has-image .slide-reveal h2` → `.slide.has-image.slide-reveal h2`
- `.slide.has-image .slide-reveal .body` → `.slide.has-image.slide-reveal .body`
- `.slide.has-image .slide-options h2` → `.slide.has-image.slide-options h2`

A descendant combinator where the render logic (`slide slide-<type> has-image` on one element) needs a compound. Fix to compound, then audit every `.slide.has-image …` rule per player: a `slide-<type>` root class after the space must be compound; a nested child (`.concept-box`, `.option`, `.misconception-quote`, `.citation-chip`) is correctly a descendant — leave those. The scrim and on-image scheme are fine; only these rules. Verify on the composite (§S5), both modes.

---

## 3. Job B — Reshape the beats (§S3, verbatim text, seasoning not replacement)

Port M1's shape CSS and `render()` support. **Realize every shape with the existing verbatim text — enlarge, isolate, lay out; no rewording, no cutting.**

**These two modules lean stark-cut. Do NOT force a figure or sequence where the §S3 trigger isn't met.** Most slides stay stacks.

Starting maps — confirm each against the triggers, and **flag your final choices in the change note:**

**Module 2 (22 slides).** No strong figure; the six steps are individual teaching slides, not a list, so no sequence. Stark-cut candidates are the aphoristic reveals:
- "A sign is a request. A lock is a fact." (~slide 20 — the module's thesis payoff; strongest)
- "Your lock. Your key. Your guarantee." (~slide 10)
- "A sign is not a lock." (~slide 2 — the setup)

Pick the one or two that most earn it. Do **not** turn every reveal into a stark-cut, and keep spacing between any two (M1's rule: never two stark-cuts in a row).

**Module 3 (29 slides).** Possible sequence:
- "Before It Restarts" (~slide 6, a 7-item `consolidation`) → **sequence if its items are an ordered checklist, grid if not** — check the items before deciding.

Stark-cut candidates:
- "Six sources. Six steps. Three roles." (~slide 27 — the course recap; strongest)
- "New lock on. Then old lock off." (~slide 3)
- "The difference is thirty seconds and a padlock." (~slide 26)

Same seasoning discipline — the strongest one or two, not all.

Where a beat's shape is genuinely ambiguous, **flag it; don't force it.**

---

## 4. `nl2br` — the narrow fix only (same as M1)

Apply M1's scoped fix: `white-space: pre-line` on the **stark-cut shape only**, so stark-cut headings break at their intended newlines at large scale. **Do NOT fix the deck-wide `nl2br` regex here** — that's a separate pass with a bigger blast radius. The narrow scoped fix is all this pass needs, exactly as M1 did.

---

## 5. `concept` → `definition` (mechanical rename, matching M1)

Rename `concept` → `definition` on M2/M3's concept slides (the v0.2 container rename). Mechanical — a type rename, same as M1. Whether a given slide is genuinely a definition versus a narrated complication (e.g., M3's "The Gap") is a **deferred content-pass question** — do not reclassify it here; just rename the container.

---

## 6. Content is frozen

No claim added, removed, or reworded in either module. Shapes rearrange and re-emphasize existing words; type and `shape` field changes are fine. Verification is **content-preservation**: every sentence still present verbatim (a dropped image path on a stark-cut that goes clean-ground is expected, as in M1 — that's not content). The known content items stay **out** — flag them, don't fix them.

---

## 7. The gate (§S5) — both modules

For M2 **and** M3: screenshot **every container type, in both modes, with and without image** — not a sample. Include every reshape and every on-image reveal (the washout cases). The after-state must show: no on-image text washed out (AA on the composite, both modes); every reshape reading clearly as its shape; the register hierarchy intact. Present the before/after set to Sean; the live demo does not update until he signs off.

---

## 8. Scope guards & hand back

- Content frozen — flag content issues, don't fix them.
- Do not touch the imagery.
- Do not fix the deck-wide `nl2br` broadly — narrow scoped fix only.
- Do not over-reshape; do not force figures or sequences. Seasoning, not replacement.
- Branch off `main`, don't stack. Hand back the branch, the full before/after screenshot set (every container × both modes × image state, both modules), and a change note: which beats got which shape, your flagged decisions (including the "Before It Restarts" ordered-or-grid call and which reveals became stark-cuts), and the content-preservation confirmation.

Build against v0.2, port from the merged M1 player, and when a beat's shape is in doubt, that doubt is a flag — not a change to force.