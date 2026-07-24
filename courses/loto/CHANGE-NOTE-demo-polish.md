# CHANGE NOTE — LOTO demo polish (2026-07-24)

Branch: `loto-demo-polish`, off `main` (post-#84/mobile-readability; unrelated
file regions to the last several passes, no overlap expected).

Status: plan committed before build (standing convention). Deviations and
discoveries are called out explicitly in Results.

---

## Plan

### Item 1 — citation chip position on image slides

**Root cause, verified against `chrome/chrome.css` on `main` (brief asked
for this explicitly).** The brief's diagnosis holds: line 65,
`.slide.has-image > * { position: relative; z-index: 2; }` (2 classes,
specificity (0,2,0)), beats the base `.citation-chip` rule's
`position: absolute` (1 class, (0,1,0)) for any citation chip that is a
direct child of an image slide — the chip drops into normal flow and lands
wherever the centered content stack ends, instead of pinning bottom-right.

**One correction to the brief's mechanism paragraph.** It describes the
fix — adding `position: absolute` to the existing
`.slide.has-image .citation-chip` block (line 779) — as "same (0,2,0)
specificity ... wins the tie [by source order]." That block is actually
three classes (`.slide`, `.has-image`, `.citation-chip`) = **(0,3,0)**, not
(0,2,0) — it already outranks line 65's rule outright on specificity, no
source-order tie-break needed (though it would also win that way, being
later in the file). Doesn't change the fix; the brief's own "confirm in
plan" instruction is exactly what caught this.

**DOM parent — verified, does not need correcting.** The brief's scope
conditionally includes `player.js` "only if the chip's DOM parent needs
correcting." It doesn't: `renderCitation()`'s output is concatenated
directly into `inner` in every `renderSlide()` branch (title, scene,
callback, teaching-caption, misconception-held-up, reveal, definition,
consolidation, options), and `inner` becomes the flat children of the outer
`.slide` div — no wrapping element in between. `renderQuiz()`/`renderClose()`
never set `has-image` at all, so the bug can't occur there regardless.
Confirmed by DOM measurement (see below), not just by reading the template
strings. **`player.js` is not touched this pass.**

**Confirmed live, quantitatively, before writing any CSS** (module-01,
1440×900, slide 7 — `teaching-caption`, has-image, has a citation source):
chip bounding box top/bottom = 554/580 against a slide height of 833 — nowhere
near the bottom edge, and in this specific case overlapping the body text's
last line ("...press and clamp and lift.") rather than merely floating
mid-slide. Slide 6 (`definition`, no image, has a citation source) in the
same session: chip bottom = 819.5 against the same 833 slide height — a
13.5px margin, exactly `1.5vh` of the 900px viewport. So the plain-slide case
already behaves correctly; only the has-image case is broken, as diagnosed.

**Fix:** add `position: absolute;` to the existing `.slide.has-image
.citation-chip` block. No other property in that block needs to change —
`right`/`bottom`/`z-index` are unaffected by this bug (they're not touched
by the line-65 override) and don't need restating.

### Item 2 — scene-text legibility over background art

**Sean's reference point, verified.** "The panel treatment (as on the 'THE
PROBLEM' reveal)" — module-01 slide index 3 — is actually a `definition`
container, not `reveal` (label "The Problem", type `definition`). What
reads well there is `.definition-box`'s has-image variant:
`background: rgba(20, 26, 22, 0.55); border-color: rgba(244, 237, 224,
0.28); backdrop-filter: blur(2px);` (chrome.css:118-122) plus the box's own
padding/border-radius (chrome.css:110-117) and `color: var(--onimage-ink)`
on the boxed text (chrome.css:130). Naming aside, this is exactly the
precedent to extend — a real panel with its own opaque-ish background,
independent of whatever is directly behind it.

**Why the current scene treatment is weaker, mechanically.** `.slide.
has-image::before` is a `radial-gradient(ellipse at center, ...0.35 ... 0%,
...0.86... 100%)` (chrome.css:58-64) — darkest at the *edges*, lightest
(0.35 opacity) at the *center*. `.slide` centers its content both axes
(`align-items: center; justify-content: center; text-align: center`), so
scene text sits exactly where the whole-slide scrim is weakest. Scene text
also has no boxed/bordered treatment of its own today (chrome.css:310-332)
— it depends entirely on that center-weak scrim plus `color:
var(--onimage-ink)`. This is a plausible root mechanism for Sean's "hard to
read" note, not just an aesthetic judgment call.

**Target check slide, verified visually (not assumed from label text).**
Module 1 has three `scene` slides; two carry images (index 1 `tuesday-
morning.jpg`, index 2 `working-inside.jpg`); index 22 has no image and is
irrelevant to this item. Rendered both: index 2 (label "Scene" — worker
mid-repair, wrench on an open roller-bearing housing, sparks/glow from the
housing interior) is both the busier art (more visual complexity, a bright
glow directly behind the third line of text) and the longer/busier text of
the two ("He presses the stop button. The belt slows. Stops. He opens the
access panel, pulls out a wrench, and starts loosening a bolt on the roller
bearing."). This is **module-01 slide index 2** — the "M1 slide with the
maintenance-scene art" the brief's check refers to.

**Default (ship this): extend the definition-box panel vocabulary to
`.slide.has-image.slide-scene p`.** Reuse the identical rgba values already
established for on-image panels (`.definition-box`, `.option`,
`.citation-chip` all use this same rgba(20,26,22,·) / rgba(244,237,224,·)
pair) — "tokens only" per the brief, read as *stay inside the existing
fixed on-image palette, don't invent new colors*, since these values aren't
literal CSS custom properties but are the de facto token vocabulary for
"glass panel over image" everywhere else in the file. `<p>` is already a
block element with `max-width: 38ch`, so backing it with
padding/border/border-radius/backdrop-filter produces the same contained-
panel look as `.definition-box` **with no markup change** — no wrapping
element needed, so `player.js` stays untouched for this item too, consistent
with the scope note above. `.scene-label` (the small uppercase kicker) stays
unpaneled, matching `.definition-label`'s precedent of sitting outside the
box — to be confirmed empirically, not assumed (see Verification).

**Alternates (capture only, evidence branch, not shipped):**
- **(a) Strengthened localized scrim** — a horizontal dark band
  (`linear-gradient`, transparent → ~0.75 opacity → transparent) behind the
  centered text zone specifically, wider darkening than the whole-slide
  vignette but no box/border — closer to a subtitle-band look.
- **(b) Tuned text-shadow** — no background at all; a multi-layer
  `text-shadow` on the scene paragraph (and label) for contrast without
  occluding any of the art.

Both applied as temporary CSS, captured at the same slide/viewports/modes as
the default, then reverted — `chrome.css` ships only the default.

**Explicitly out of scope, noted not fixed:** the same weak-center-scrim
mechanism plausibly affects other has-image register types (teaching-
caption, misconception-held-up, reveal, callback) to varying degrees, but
the brief scopes this item to scene text only and its own check requires
"no change to non-scene slide types" — flagging the pattern for a future
backlog item, not touching it here. Also out of scope, staying in
`CHROME-CSS-CLEANUP-QUEUED.md` per the brief's Scope section: the stark-cut
`pre-line` removal, popover dark-mode elevation, and `restartQuiz()`'s
pre-existing `updateProgress()` gap (confirmed still present by reading
`player.js:370-376` — noted, not touched).

### Verification plan

1. **Composite-contrast check (new tooling).** No contrast-checking utility
   exists in `tools/capture` yet — building
   `tools/capture/contrast-check.js`: for a given selector, sample actual
   rendered pixels from a deterministic screenshot (not token pairs) near
   the element's box edges for the background, read the element's computed
   text color, compute WCAG relative luminance/contrast ratio, and apply the
   correct AA threshold (3:1 large text ≥24px regular or ≥18.66px bold at
   that specific viewport's computed size, else 4.5:1) — per the Slide-Type
   Standard's explicit "verified on the rendered composite, not token pairs
   in isolation" requirement. Run against slide index 2, both the paneled
   `p` and the unpaneled `.scene-label`, at 1440 and 390, both modes. This
   also decides the open question above (does the label need its own
   treatment) from measurement rather than assumption.
2. **Citation chip captures.** Slide 7 (has-image) and slide 6 (plain),
   Reviewer mode on, both modes, desktop 1440 + 390 — before/after,
   confirming bottom-right pinning and that the `> *` override no longer
   applies (measured via `getBoundingClientRect`, not just eyeballed).
3. **Scene default + both alternates.** Slide index 2, desktop 1440 + 390,
   both modes — before/after for the default (shipped), plus the two
   alternates (evidence branch only).
4. **M2/M3 scene sweep, read-only.** `chrome.css` is shared verbatim across
   all three modules, so the panel treatment reaches any M2/M3 has-image
   scene slides for free — capturing them too as supporting evidence, no
   content/data changes, not a gate (the brief's formal check is M1's
   slide only).
5. **Overflow-audit regression gate** (`tools/capture/overflow-audit.js`)
   against the #84 baseline (`courses/loto/screenshots/mobile-readability/
   overflow-after.json` on `main`) — zero new clipped-and-unscrollable
   slides. Neither change should affect layout height/width, but this is
   the established regression gate for this deck per prior passes.
6. **Desktop pixel-diff vs `main`**, all M1 slides, both modes — expect
   0.0000% everywhere except: slides with a citation chip on a has-image
   slide (item 1), and has-image scene slides (item 2). Any other slide
   showing a diff is a regression, not an intended change.

All captures + the contrast-check output + overflow-audit JSON go to
`evidence/demo-polish` (never merged), linked from the PR body — nothing
lands on the PR branch but `chrome.css`, this change note, and the
`tools/capture` extension, per the evidence-branch convention
(WORKFLOW-TRACE addendum C, T21).

### Not in scope

Everything in `CHROME-CSS-CLEANUP-QUEUED.md` items 1–3 (stark-cut cleanup,
popover elevation, `restartQuiz()` progress gap). No module shells, no
`MODULE`/`MODULE_CHROME` data, no menu file. `player.js` is not touched by
either item in this pass (both confirmed above).

---
