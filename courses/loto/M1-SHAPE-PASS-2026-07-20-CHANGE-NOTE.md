# LOTO Module 1 — Shape Pass + Chrome Fixes — Change Note

**Date:** 2026-07-20
**Branch:** `claude/m1-shape-pass-2026-07-20` (off `main`, not merged — live demo unchanged pending sign-off, per the brief's §5 / Durability §7 / §M5)
**Built to:** `docs/standards/SLIDE-TYPE-STANDARD.md` v0.2
**Screenshots:** `courses/loto/M1-SHAPE-PASS-2026-07-20-screenshots/`
**Scope:** Module 1 only (`courses/loto/builds/module-01/index.html`, `module-01.json`) plus the course menu (`courses/loto/builds/index.html`). Modules 2–3 untouched.

Pure presentation. Content is frozen: every claim in the module is verbatim-identical to `main`, possibly relocated. This was checked automatically, not just by eye — a script extracted all 163 string leaves from the pre-pass `module-01.json` and confirmed each is still present verbatim in the post-pass file, either unchanged or (for the one deliberate relocation) reassembled by joining two new fields. Result: 0 unexplained missing strings, 0 unexplained new strings. The only "missing" originals are the 6 literal `"concept"` type tags (renamed to `"definition"`, a type label not a claim) and the one dropped image path (see Job B). The menu's copy was diffed separately — every changed line is CSS, the font `@import`, or the removed `grain`/`vignette` divs; zero copy lines changed.

---

## Job A — the on-image washout

Confirmed the diagnosis in the brief exactly: the scrim and the fixed on-image ink scheme were already correct. The bug was three rules written as a descendant combinator where `has-image` and the type class needed to be compound, since the renderer puts `slide`, `slide-<type>`, and `has-image` on one element:

- `.slide.has-image .slide-reveal h2` → `.slide.has-image.slide-reveal h2`
- `.slide.has-image .slide-reveal .body` → `.slide.has-image.slide-reveal .body`
- `.slide.has-image .slide-options h2` → `.slide.has-image.slide-options h2`

Audited every other `.slide.has-image …` rule in the file by hand against the same test (is the class after the space a `slide-<type>` root class, or a nested child?). No other instance was broken — the ones addressing nested children (`.concept-box`/`.definition-box`, `.box-text`, `.option`, `.option-content`, `.misconception-quote`, `.citation-chip`) were already correctly left as descendant selectors.

`options` has no instance in M1's current data, so the fix there is defensive/correct-by-inspection but not screenshot-verified against real content — flagging that rather than fabricating an options slide to test it.

Before/after proof: `before-idx14-reveal-image-washout-{light,dark}.png` vs. `after-t08-reveal-stack-image-{light,dark}.png` (same slide, "Where gravity fits," shape untouched — isolates the CSS fix from the reshape work). The heading and body flip from dark forest/aubergine ink (illegible over the dark art) to the cream on-image scheme.

## Job B — the shape axis

Added a generic `shape` field: `renderSlide()` now appends `shape-${slide.shape}` to the slide's class list alongside `slide-${type}` and `has-image`, so shape-specific CSS follows the same compound-selector rule Job A just fixed. Three shapes realized, all built in the player (no generated art, no new fonts):

| Heading | Type | Shape | Notes |
|---|---|---|---|
| "2000 PSI doesn't vanish because you closed the valve." | `teaching-caption` | **figure** | New `figure` field holds `"2000 PSI"`; `heading` holds the verbatim remainder, `"doesn't vanish\nbecause you closed the valve."` Concatenating the two reproduces the original heading exactly. |
| "The Six Steps" | `consolidation` | **sequence** | Two rows of three (grid, not a vertical list), connector line between steps within a row, none across the row break. Every step's existing `<strong>label.</strong> text` kept verbatim, including the `num` field's trailing period. |
| "Two minutes. Four ounces." | `reveal` | **stark-cut** | Background image (`img/s13-two-minutes-padlock.jpg`) dropped per the brief — clean cream/dark ground, per the approved prototype. Body kept verbatim, de-emphasized (small, quiet) on the same slide rather than moved to a neighbor. The image file itself is untouched on disk, only the reference in this one slide was removed. |
| "Off is a button you push. Safe is a process you complete." | `reveal` | **stark-cut** | **Judgment call, decided, not left ambiguous:** made this a stark-cut too. Reasoning: it has the same aphoristic, parallel-clause structure as the confirmed stark-cut, it already carried no image (nothing to drop), and it sits 7 slides away from the other stark-cut with a sequence, two teaching-captions, and a callback in between — so the deck doesn't read as two stark-cuts back to back. Net shape count: 4 of 25 slides reshaped (16%), 2 of 5 `reveal` slides as stark-cut — reads as seasoning, not a new default. Flagging the call here in case Sean weighs it differently. |

`misconception-held-up` — left untouched, as instructed (working, validated).

Everything else — including the other `reveal`, `scene`, `callback`, `misconception-held-up`, and grid-shaped `consolidation` slides — kept its current (default/stack) shape. No trigger, no reshape.

**Type rename (§S4):** `concept` → `definition` everywhere — the `type` field in both `module-01.json` and the embedded `MODULE` const, the render-function case, and (for internal consistency, since a `slide-definition` container calling its own CSS classes `.concept-box`/`.concept-label` would be stale the moment it shipped) the CSS class names `.concept-box` → `.definition-box`, `.concept-label` → `.definition-label`. `.box-text` and `.body` were already generic and untouched.

**A second bug found and narrowly worked around, not fixed:** `nl2br()` — `s.replace(/\\n/g, '<br>')` — matches the two literal characters `\` and `n`, not an actual newline. Every heading's embedded `\n` is already a real newline by the time it reaches this function (that's how JS string literals work), so the regex has always been a no-op; every "intended" line break in every heading across the whole deck has always silently collapsed to the browser's natural wrap instead. It's invisible at teaching-caption/reveal scale, where natural wrap happens to land close enough. It is not invisible at stark-cut's much larger scale — "Two minutes.\nFour ounces." was wrapping to three lines instead of two. Fixed *only* for the new shape, by adding `white-space: pre-line` to `.slide.shape-stark-cut h2` — this makes the browser honor the real newline that's already in the string, scoped to exactly the two slides using this shape, touching nothing else in the deck. The underlying `nl2br()` bug is deck-wide and out of this pass's scope — flagging it rather than fixing it broadly, since a global fix would change the rendered line breaks on most of the module's headings and that's a bigger blast radius than this brief asked for.

## Job C — the menu

Rebuilt `courses/loto/builds/index.html` onto the same token contract as the players: cream `#f4ede0` / forest `#1f3a2e` / aubergine `#3a1f2e` / warm gray `#6b5d4a`, Lora + IBM Plex Sans, the fluid `clamp()` scale. Removed the dark-navy/orange/blue palette, Inter/IBM Plex Condensed/JetBrains Mono, and the grain + vignette overlay divs — none of it matched the players or the marketing brand, per the brief. Structure and every word of copy (title, subtitle, description, meta line, all three module rows, the contact section, the footer) kept verbatim — confirmed by diff, not just by eye (see the content-freeze note above).

**Judgment call:** no dark-mode toggle added to the menu. The brief's chrome instruction ("the chrome does apply") reads to me as the surface/type/spacing system, not necessarily the dark toggle specifically — the gate section only asks for the menu to be screenshotted once ("the menu on-brand and matching the players"), not in both modes like the slide containers, and the marketing site it's matching has no dark mode at all. Flagging in case Sean wants the toggle added for full parity with the players.

## The gate

Every container type in M1 was screenshotted in both modes, with and without image, using each type's actual instance(s) in the deck. Coverage is by **container type × image-state × mode**, not literally every one of the 25 slide instances — e.g., all 6 `definition` no-image slides share identical CSS and only one was shot, since the other 5 would be pixel-identical proof of the same rule. Flagging this interpretation of "not a sample" in case Sean wants literal per-slide coverage instead; the type-level set is 18 stops × 2 modes = 36 after-screenshots, covering: title, scene ×2 image-states, definition ×2 image-states, misconception-held-up, teaching-caption stack ×2 image-states, teaching-caption figure, reveal stack ×2 image-states, reveal stark-cut ×2 (one image-dropped), callback ×2 image-states, consolidation ×2 shapes, quiz, close.

Checked against the four criteria in §6:

1. **No on-image text washed out, AA on the composite, both modes** — confirmed by screenshot for every has-image container (`scene`, `definition`, `misconception-held-up`, `teaching-caption`, `reveal`, `callback`); the three broken rules were the only offenders and are fixed.
2. **The three reshapes read clearly as their shapes** — figure, sequence, and stark-cut all screenshot-verified in both modes; see the table above for specifics (sequence's row-break connector logic, stark-cut's two/four-line composition after the `pre-line` fix).
3. **Menu on-brand, matching the players** — `after-menu-light.png` / `after-menu-full-light.png` vs. `before-menu-light.png`.
4. **Register hierarchy intact** — `misconception-held-up` (idx5) still visibly lighter/quoted/set-back than any `teaching-caption` or `reveal` in the same before/after set; untouched by this pass.

**Not done:** the live demo is unchanged. Per the brief, that only updates after Sean signs off on this set.
