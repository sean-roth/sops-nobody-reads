# Module 1 — Slide → Image Manifest

Built against the regenerated `module-01.json` (32 slides), Phase 2 of the LOTO Pass-4 rework. This manifest does not generate any images — it maps each slide to either an existing file (visually re-verified this pass, not just filename-matched) or flags it NEW. **Do not trust `IMAGE-PROMPTS.md` as a map** — its prompts were written against the old, independently-drifted `module-01.json` and no longer describe what the current script/JSON actually need.

**Learner-language rework update (Pass 6, current):** `module-01.json` is now **27 slides**, not 32 — REWORK-2026-07-16.md §5 merged the five separate energy-type slides (old 9–13: electrical, hydraulic/pneumatic, mechanical, chemical, thermal) into two ("The Ones You Already Know" and "The Underweighted Pair"). The surviving merged slide kept `s09-pneumatic-system.jpg` (it also carries the hydraulic/pneumatic source citation); `s07-electrical-panel.jpg` and `s08-mechanical-parts.jpg` are no longer referenced by any slide and have been quarantined (`_quarantine/module-01/img/`, see that folder's README — both are clean, reusable if a future pass un-merges these slides). No other image assignments changed. Slide numbers throughout the rest of this file predate the rework and no longer line up 1:1 with current positions; `module-01.json` is the ground truth for current slide position.

Every existing image in `courses/loto/builds/module-01/img/` was opened and visually checked against the new slide content before being marked as a candidate — not assumed from its filename.

**Pass-6 update (FIX 6):** every file listed under "Rejected" and "Not individually viewed this pass" below has been moved to `courses/loto/_quarantine/module-01/img/` — out of the shipped package entirely, per audit NOTE 2.6. The "Reused" list below is now the complete, exact contents of the shipping `module-01/img/` directory.

## Reused (11 images — visually verified against new slide content)

| Slide # | Type | Content | Image | Note |
|---|---|---|---|---|
| 2 | scene | Cold open — tool cart, tuesday morning | `s01-tuesday-morning.jpg` | Clean match |
| 3 | scene | Cold open — worker at bearing | `s02-working-inside.jpg` | Clean match |
| 4 | concept | The problem — unlocked disconnect | `s03-unlocked-disconnect.jpg` | Clean match (also reused on slide 24, see below) |
| 6 | keypoint | What most people think LOTO is | `s05-simple-padlock.jpg` | Locked padlock on a breaker — exactly the "simplest possible image of LOTO" the script describes |
| 7 | keypoint | Most people think electricity | `s06-electrical-symbol.jpg` | Hazard-triangle + panel, matches the script's own `[VISUAL: A simple electrical hazard symbol.]` cue |
| 9 | concept | Movement A — electrical | `s07-electrical-panel.jpg` | Strong match, no embedded text |
| 10 | keypoint | Movement A — hydraulic/pneumatic | `s09-pneumatic-system.jpg` | Cylinder/gauge/hose assembly, no legible number baked in |
| 11 | concept | Movement A — mechanical | `s08-mechanical-parts.jpg` | Springs/gears/pulley, good generic match |
| 18 | reveal | Movement B — gravity/suspended platen | `s11-stored-energy.jpg` | Excellent match — literally shows a suspended press platen with the person-sized gap the script describes |
| 24 | scene | Off isn't safe — callback to cold open | `s03-unlocked-disconnect.jpg` | Same file reused deliberately — this slide is an explicit callback to slide 4's imagery |
| 31 | reveal | Closing — two minutes, four ounces | `s13-two-minutes-padlock.jpg` | Single closed padlock on a platform, matches the closing beat |

## Rejected — do not reuse

| Old file | Problem |
|---|---|
| `s10-hydraulic-system.jpg` | Has **"3000 PSI" baked into the artwork as literal text**. We standardized the script on 2000 PSI (Phase 1); this image now asserts the wrong number in pixels, not just stale metadata. Also violates the course's own "no text in image" style rule (CLAUDE.md). Needs regeneration from scratch, not a caption fix. |
| `s04-the-difference.jpg` | Two-panel composite whose right panel shows a **locked** padlock on the disconnect. The slide it was built for (old JSON) needed a locked image; the new slide 5 ("He stopped the machine. He didn't secure it.") is describing the **unlocked** state. Reusing this image here would visually contradict the narration. |
| `s12-invisible-danger.jpg` | Not viewed this pass — superseded regardless, since the brief explicitly calls for a new two-layer convergence diagram (slide 20) rather than the old single-layer "invisible danger" framing. |
| `s14-worker-leaves.jpg`, `s15-someone-flips-switch.jpg` | Depict a scene that **no longer exists in the script**. The old JSON invented a cliffhanger ending (worker leaves the disconnect unlocked, someone else flips it) that isn't in `module-01-the-energy-you-dont-see.md` at all — the actual script's callback is a redemption scene where the worker locks out correctly. These two images are orphaned; reusing either would show the wrong story. |
| `s16-key-points.jpg` | Not viewed this pass. The slide it was built for (a `list` type) is superseded by the new list slide (26, six-steps preview) and summary slide (32); neither carries an image in this regeneration, consistent with how list/summary slides are handled elsewhere in the course. Likely unused going forward. |

## NEW — needs generation (11 slides)

| Slide # | Type | Content | Why new |
|---|---|---|---|
| 5 | reveal | "He stopped the machine. He didn't secure it." | No usable existing image (see `s04` rejection above); needs unsecured-state imagery |
| 12 | keypoint | Movement A — chemical energy | No chemical-energy image existed in the old set at all |
| 13 | concept | Movement A — thermal energy | **Explicitly flagged NEW by the brief.** Steam/oven/hot-surface imagery — brand new source, no prior art |
| 15 | concept | Movement B — electrical/capacitor callback | Needs the specific "capacitor bank now visible, charge-warning symbol" detail the script calls for — distinct from slide 9's wider panel shot |
| 16 | keypoint | Movement B — hydraulic/trapped-pressure callback | Needs "valve now closed, gauge still 2000" framing; `s10` rejected (wrong PSI baked in), and slide 10 already uses `s09` |
| 17 | concept | Movement B — mechanical/spring callback | Needs a "still tight, still loaded" close-up distinct from slide 11's wider mechanical shot |
| 20 | reveal | The convergence diagram | **Explicitly flagged NEW by the brief.** Two-layer diagram: six named sources + their stored-energy shadow, converging on the work space. This is the module's visual thesis — treat as a priority asset |
| 21 | scene | Off isn't safe — what off looks like | No existing equivalent; old JSON never adapted this beat |
| 25 | concept | Stored energy — defined (valve/gauge) | Needs its own valve-closes/gauge-still-reads close-up per the script's moment-to-moment panels; distinct from the Movement B hydraulic callback |
| 29 | scene | Back to Tuesday — reaching for the lockout station | Positive-resolution imagery; doesn't exist in the old set (whose ending was the wrong cliffhanger — see rejections) |
| 30 | scene | Back to Tuesday — locked, tagged, verified | Same reasoning as above |

## No image needed by design (10 slides)

Typography-forward per the script's own Tone Calibration notes ("Thesis moments: Typography-heavy, minimal image") or conventionally image-less slide types (title, list, summary). Falls back to the player's gradient background, which BUILD-SPEC.md notes "still look[s] good":

Slides 1 (title), 8 (energy-source definition box), 14 (Movement B intro reveal), 19 (Movement B closing), 22 (thesis reveal), 23 (minimal "off is a button" slide), 26 (six-steps list), 27 ("simple is dangerous"), 28 (isolation principle), 32 (summary).

Reasonable to revisit any of these with art in a later pass, but none block shipping the JSON/player layer.

## Priority for the next image-generation pass

1. **Thermal (13)** and **the convergence diagram (20)** — explicitly required per the brief, and both are load-bearing (thermal is the whole point of the B1 fix; the convergence diagram is the module's stated visual thesis).
2. The three Movement B callback panels (15, 16, 17) — needed to make the "subject-to-subject return to the same equipment" device actually work visually; right now those slides fall back to gradient, which is functional but undersells the structural device Phase 1 built.
3. Everything else, as budget allows.
