# LOTO Module 1 — Shape Pass + Chrome Fixes

**Date:** 2026-07-20
**For:** a Sonnet instance with repo access (GitHub MCP) and a Playwright-capable browser.
**Governing document:** `docs/standards/SLIDE-TYPE-STANDARD.md` **v0.2** (on `main`). Build to it.
**Scope:** Module 1 only, end-to-end. **Pure presentation — content is frozen** (claims verbatim; no rewording, no additions, no cuts). Three jobs: fix the on-image washout, reshape the beats that want a shape, reskin the course menu. The known content items are explicitly **out** of this pass.

---

## 1. Read first

1. `docs/standards/SLIDE-TYPE-STANDARD.md` v0.2 — especially §S3 (the shape axis and the *use-it-when* triggers), §S4 (the catalogue), §S5 (chrome, scrim, composite-contrast, and the gate).
2. The current M1 player: `courses/loto/builds/module-01/index.html` — a single self-contained file: inline `<style>` chrome, inline `SLIDES` data, render logic. Note the render builds `slide slide-${type}` and appends `has-image` **on the same element** (around line 1010) — this is why selector form matters below.
3. The M1 build: `courses/loto/builds/module-01.json`.
4. `styles.css` in `sean-roth/sopsnobodyreads-site` — the brand tokens; the chrome already sources them.

---

## 2. Job A — Fix the on-image washout (do this first; it is live on the demo)

**It is not a missing scrim.** The scrim (`.slide.has-image::before`, a radial gradient) and the fixed on-image scheme (`--onimage-ink: #f4ede0`, `--onimage-ink-dim`) already exist and are correct — do not rebuild them.

The bug is three color overrides written with a **descendant combinator** where a **compound** is required. Because `slide`, `slide-<type>`, and `has-image` all sit on one element, a space before `.slide-reveal` / `.slide-options` never matches, so the text falls back to `--ink` / `--accent` — which are dark in light mode — over the dark art:

- `~413` `.slide.has-image .slide-reveal h2` → `.slide.has-image.slide-reveal h2`
- `~422` `.slide.has-image .slide-reveal .body` → `.slide.has-image.slide-reveal .body`
- `~305` `.slide.has-image .slide-options h2` → `.slide.has-image.slide-options h2`

Then **audit every `.slide.has-image …` rule**: where the class after the space is a `slide-<type>` root class, it must be compound (no space); where it is a nested child (`.concept-box`, `.box-text`, `.option`, `.option-content`, `.misconception-quote`, `.citation-chip`), the descendant form is correct — leave those.

Note for your own sanity check: this washout shows in **light** mode (the default), not dark — the green heading and maroon body reported are the light-mode `--ink` and `--accent`. Verify per §S5 on the **rendered composite** (text over image + scrim), AA in *both* modes.

---

## 3. Job B — Reshape the beats (§S3, verbatim text)

Add the shape axis to M1. The player renders from the JSON; add a `shape` field to the reshaped slides and extend the CSS/render to honor it.

**Realize every shape with the existing verbatim text — enlarge, isolate, lay out. Do NOT reword, compress, or cut a claim.** (This is what keeps the pass auditable as content-frozen.)

Confirmed reshapes, by heading:

- **"2000 PSI doesn't vanish because you closed the valve."** → **figure.** The quantity `2000 PSI` leads at scale; the rest of the slide's existing text is the caption/body, verbatim.
- **"The Six Steps"** (the `consolidation`) → **sequence.** The six steps as a visible ordered progression, not a vertical list. Keep each step's existing text verbatim — if six-across is too tight, use two rows or a connector layout; do not shorten the text.
- **"Two minutes. Four ounces."** → **stark-cut.** The two lines at large scale on a **clean ground** (drop the background image, per the approved prototype). The slide's existing body text stays verbatim — either de-emphasized on the same slide, or moved *verbatim* to the adjacent beat. Do not cut it.

One judgment call — **specify or flag, your choice:**

- **"Off is a button you push. Safe is a process you complete."** → a strong turn; consider **stark-cut.** If it would over-season the module (too many stark-cuts), leave it a `reveal`. Flag your decision either way.

**Everything else keeps its current shape.** *Seasoning, not replacement* (§S3): do not reshape a slide that has no clear trigger. If a beat seems to want a shape and you're unsure, **flag it — don't force it.** The `misconception-held-up` slide is working as validated; leave it as is.

While you are in the types: rename `concept` → `definition` to conform to v0.2 (§S4). That is a type rename, not a content edit.

---

## 4. Job C — Reskin the course menu

`courses/loto/builds/index.html` is off-brand: dark-navy/orange/blue palette (`--bg-dark #0a1628`, `--accent-orange #f59e0b`, blue accents), Inter / IBM Plex Condensed / JetBrains Mono, plus grain and vignette — nothing like the players or the marketing brand.

Rebuild it onto the §S5 token contract: cream / forest / aubergine, Lora + IBM Plex Sans, the fluid type scale. **Keep its structure and copy verbatim** — the course title, subtitle, description, meta line, and the three module rows linking to `module-0X/index.html`. It should read as the same product as the players. It is a menu, so the slide containers don't apply — but the chrome does.

---

## 5. Content is frozen (the line that keeps this auditable)

No claim is added, removed, or reworded anywhere in this pass. Shapes rearrange and re-emphasize existing words; the menu keeps its copy. **Type and `shape` field changes are fine** (the `concept`→`definition` rename; the new `shape` field). The verification is **content-preservation**: every sentence that existed still exists, verbatim (possibly relocated), and nothing new was written.

The three content items already on the backlog — the misconception slide carrying its own correction, the "fourth-role" belief with no held-up slide, and the "you've worked around these for years" presumptive line — are **out of scope.** Do not touch them; do not fix them. They run through a separate content pass with re-validation. If you spot other content problems, **flag them; don't fix them.**

---

## 6. The gate (§S5) — do not report done without it

Playwright, before/after, and complete this time: screenshot **every container type in M1, in both modes, with and without image** — not a sample. Include the three reshaped beats and every on-image reveal (the washout cases). The after-state must show:

1. no on-image text washed out — AA on the composite, both modes;
2. the three reshapes reading clearly as their shapes;
3. the menu on-brand and matching the players;
4. the register hierarchy intact — the misconception still lighter than any teaching-caption.

Present the before/after set to Sean. The live demo does not update until he signs off (a human signs — Durability §7, §M5).

---

## 7. Scope guards — do NOT

- Do not reword, add, or cut any claim. Content frozen. Flag content issues; don't fix them.
- Do not touch the LOTO imagery (the noir art stays; §S6).
- Do not rebuild the working scrim or on-image scheme — only fix the broken selectors.
- Do not over-reshape. Seasoning, not replacement; most slides stay stacks.
- Do not do Modules 2 or 3 — M1 only, to prove the recipe before it rolls.
- Do not commit to `main`, and do not stack branches (§M5). Branch off `main`; hand back the branch.

---

## 8. Hand back

- The reshaped M1 player (`module-01/index.html`), the updated `module-01.json` (type and `shape` fields only — no content edits), and the reskinned menu (`builds/index.html`).
- The full before/after screenshot set (every container × both modes × image state).
- A change note: which beats got which shape, the selector fixes made, confirmation the content is verbatim (with the content-preservation check), and any beat you flagged rather than reshaped.

Build against v0.2. When a beat's shape or a piece of content is in doubt, that doubt is a flag for Sean — not a change to make.