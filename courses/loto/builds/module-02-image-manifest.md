# Module 2 — Slide → Image Manifest

Built against the regenerated `module-02.json` (23 slides), Phase 4b of the LOTO Pass-4 rework. Every candidate below was opened and visually checked against the new slide content — not filename-matched. Do not trust slide numbering carried over from the old build; both the script and the decomposition changed.

## Reused (7 images — visually verified)

| Slide | Content | Image | Note |
|---|---|---|---|
| 5 | Step One — Prepare | `s05-prepare.jpg` | Worker reading a "Lock-Out Tagout" clipboard checklist, tools nearby. Clean, legible, no wrong claims. |
| 7 | Step Two — Shutdown | `s06-shutdown.jpg` | Gloved hand pressing a red stop button near conveyor rollers. Clean match. |
| 8 | Step Three — Isolate | `s07-isolate.jpg` | Three-panel composite: electrical disconnect (OFF), a valve, a hose fitting. Matches the script's own three-panel isolation sequence closely. |
| 9 | Step Four — Lock | `s08-lockout.jpg` | Hand applying a padlock + tag to a disconnect. **Caveat:** tag has partial text ("OUT," likely cropped "LOCKOUT") baked in — not a wrong claim, just a minor style-rule violation (no-text-in-image). Usable but worth a clean regenerate if budget allows. |
| 13 | Tags vs. Locks | `s12-tags-vs-locks.jpg` | Two-panel composite: solid padlock / lock+tag with a blank (no legible text) tag. Clean. |
| 15 | Step Five — Stored Energy | `s09-stored-energy.jpg` | Hand bleeding a hydraulic line into a catch pan, gauge visible with no misleading number baked in. Clean. |
| 17 | Step Six — Verify | `s10-verify.jpg` | Hand pressing an E-stop-style button. Reasonable match, not a perfect literal "start button" but close enough thematically. |

## Rejected — do not reuse

| Old file | Problem |
|---|---|
| `s01-handwritten-sign.jpg` | The sign shows **garbled, illegible handwriting** ("Way what... I do cant... bar/wg wk") — nonsensical AI-generated text, not the script's "DO NOT TURN ON — Mike working on Line 3." Violates the no-text-in-image rule *and* is illegible/wrong. |
| `s11-one-person-one-lock.jpg` | Three padlocks on a hasp labeled **"FULD DLOWK"** — garbled text (evidently meant to read something else). Same class of defect as Module 1's Phase 2 findings. |
| `s15-six-steps-complete.jpg` | Tag reads **"LOCKLLOW / TAG OUT"** — garbled ("LOCKOUT" misspelled). Otherwise a strong composition (press with load blocked, padlock+tag, gauge at zero); worth regenerating clean rather than discarding the concept. |
| `s02-flips-breaker.jpg` | Illegible scribbled sign (not a wrong-fact problem, just decorative), and the breaker's ON/OFF state in the image doesn't clearly match "flips the breaker to ON." Weak match, not confidently reusable. |
| `s03-sign-vs-lock.jpg` | Two-panel composite built for the old script's structure (illegible note + bare padlock). Doesn't cleanly map to any single new slide. |
| `s04-six-steps.jpg` | Footprints on a factory floor — atmospheric, but doesn't convey "six steps as layers," which is what the "Why Order Matters" slide needs. |

## Not individually viewed this pass

`s13-experienced-worker.jpg`, `s14-just-this-once.jpg` — tied to the old script's "psychology of skipping" framing, which is now a different structure (a 5-item excuse list vs. two named beats). Low priority; default to NEW rather than assumed-reusable until checked.

## NEW — needs generation (6 slides)

| Slide | Content | Why new |
|---|---|---|
| 2 | Cold open — sign on breaker, hand flips it ON | `s01`/`s02` both rejected/weak (garbled or ambiguous text) |
| 3 | Reveal — "A sign is not a lock" | `s03` was built as a different two-panel structure; no clean single-image match |
| 4 | Keypoint — "Why Order Matters" (six steps as layers) | `s04`'s footprints don't convey the concept |
| 10 | Concept — "One Person, One Lock" | `s11` rejected (garbled "FULD DLOWK" text) |
| 21 | Scene — callback, breaker panel with lock replacing sign | No existing equivalent verified; old ending diverged from new callback structure |
| 22 | Scene — callback, inside the machine, steady work | Same reasoning |

## No image needed by design (10 slides)

Typography-forward per the script's own tone notes, or conventionally image-less types (title, list, summary): slides 1 (title), 6 (notify — also step one), 11 (why no master keys — typography-forward reveal), 14 (tags actual structure — regulatory-quote slide, matches M1's convention of citation slides going image-less), 16 (reaccumulation — same), 18 (psychology excuses list), 19 (psychology truth reveal), 20 (psychology whole-point keypoint), 23 (closing reveal — could take `s15` if regenerated clean, otherwise stays typography-forward), 24 (summary).

## Priority for the next image-generation pass

1. **Cold open (slide 2)** — first thing a learner sees; currently has no clean asset.
2. **One Person, One Lock (slide 10)** and **the two callback slides (21, 22)** — load-bearing narrative beats with no reusable art.
3. Regenerate `s08-lockout.jpg` and `s15-six-steps-complete.jpg` clean (fix the baked-in text) rather than starting from scratch — both have strong compositions already.
