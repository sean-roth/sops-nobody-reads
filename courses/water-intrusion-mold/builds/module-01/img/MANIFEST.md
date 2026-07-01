# Module 1 — Image Manifest

Drop images into this folder using these **exact** filenames. Lowercase, `.jpg`, no spaces.
The player references them as `img/sNN-name.jpg`. Any missing file shows a labeled placeholder in the player, so the module stays clickable while you fill it.

| Slide | File | Source asset | On-screen anchor |
|-------|------|--------------|------------------|
| 1 (title) | `s01-establishing.jpg` | **NS-1** — building at dusk, warm windows | *(title over image)* |
| 2 | `s02-window-grid.jpg` | **A2** — window grid | *(no line)* |
| 3 | `s03-the-margin.jpg` | **NS-2** — family + the corner (rack-focus frame) | "Three feet away, something is already growing." |
| 4 | `s04-dead-plants.jpg` | decaying leaf | "Dead plants. Of course." |
| 5 | `s05-dead-animals.jpg` | skull in moss | "Dead animals. Absolutely." |
| 6 | `s06-drywall.jpg` | drywall bloom corner | "Drywall. Also yes." |
| 7 | `s07-the-drop.jpg` | pipe-joint drop *(this session's `Slide_8_--_Water_drop-4.jpg`)* | "It only follows moisture." |
| 8 | — | *type card* **48 HOURS** (no image) | — |
| 9 | — | *type card* mythology beat (no image; flagged — reprise an image?) | — |
| 10 | `s10-the-pan.jpg` | dry pan *(this session's `Slide_9_--_Water_pan-2.jpg`)* | "Most days, nothing. That's the bet paying off." |
| 11 | — | *type card* **CONTROL THE MOISTURE** (no image) | — |
| 12 | `s12-the-hallway.jpg` | tech in hallway *(this session's `Slide_10_--_Hallway-2.jpg`)* | "Next: where the water hides." |

**Notes**
- No `s08` / `s11` files — those slides are text cards.
- `s09` is currently a text card (the mythology beat is narration-carried). If you decide to reprise an image there, add `s09-*.jpg` and switch that slide's type from `card` to `cinematic` in `module-01.json` and `index.html`.
- Recommended: long edge ~2400px, sRGB, quality ~80. The player uses `object-fit: cover`, so slight crop at extreme aspect ratios is expected — most important subject matter should sit off dead-center-bottom (the lower third carries the anchor text and a scrim).
