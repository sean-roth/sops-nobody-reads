# Production Log — Water Intrusion & Mold

## 2026-07-01 — Module 1 assembled (first vertical slice)

Built the first playable mockup of Module 1 to get out of the "black box" — reading scripts wasn't landing because this is sequential art: meaning lives in image + text together, not in narration alone (and the narration was written dual-track, so it reads hollow in isolation on purpose).

### The image-forward player variant
The existing SOPs player (loto, ai-onboarding) is **text-forward**: a heading + body paragraph with a supporting image. Maple Court is **image-forward**: the cinematic photo *is* the slide, text is a minimal anchor (A24-not-Zillow, abstraction doctrine — detail on objects, people abstract). So `builds/module-01/index.html` is a Maple Court variant on the same MODULE schema and folder convention:

- **Same schema** as `loto/builds/module-0N.json` (per-slide `image` field), plus two extensions:
  - slide types `cinematic` (full-bleed image + anchor line) and `card` (text-only type card, optional accent `cold`/`warm`)
  - a `narration` field per slide (the spoken V.O.), rendered as a **toggleable caption** so image + anchor + narration can be reviewed together
- **Editorial theme register** (dark, warm, documentary): near-black warm bg, cream text, Instrument Serif + IBM Plex Sans, film grain / vignette / subtle scanlines. Chrome accent = warm gold; threat cards = cold blue; resolution card = warm.
- Self-contained, ~22KB, no dependencies except Google Fonts. Graceful image fallback (labeled placeholder on missing file). Keyboard nav; `N` toggles narration.

If this variant proves out, it's worth folding `cinematic` / `card` / `narration` back into the `aesthetic-design` skill as a "Cinematic/Maple Court" theme so future image-forward courses generate the same way.

### Module 1 slide sequence (13 content slides + 3-question self-check + results)
title(NS-1) · window-grid(A2) · the-margin(NS-2) · dead-plants(leaf) · dead-animals(skull) · drywall(bloom) · the-drop(pipe joint) · **48 HOURS** card · mythology card · the-pan(dry pan) · **CONTROL THE MOISTURE** card · the-hallway(tech) · summary.

### Open items surfaced by assembly
- **Slide 9 (mythology beat)** is currently a text card — narration-carried, no image. Decide whether to reprise an existing image (e.g. the decay/leaf frame) under the mythology line. Flagged in `img/MANIFEST.md`.
- **Self-check tone:** a 3-question quiz is included to match player convention and show the full pipeline. Confirm whether a narrative course of this register wants an on-screen quiz, or whether assessment lives only in the field-guide tier.
- **Anchor vs. narration split:** first chance to feel the dual-track live. Watch for slides where the anchor line and narration say too much the same thing (redundant) or leave a gap the image doesn't fill.
- Slides 8/11 type-card phrasing (`48 HOURS`, `CONTROL THE MOISTURE`) and the mythology card copy are first passes.

### Images
9 locked assets, named in `img/MANIFEST.md`. Sean places images manually. Three were already shot this session (drop, dry pan, hallway); the other six (NS-1, A2 grid, NS-2, leaf, skull, bloom) are locked locally.

## Prior state
- Module 1 images: complete. Modules 2 & 3: scripts drafted (v1), domain flags open, not yet decomposed.
- Full creative/production decisions live in the master production bible (kept in Sean's working docs, not in-repo).
