# Module 3 — Slide → Image Manifest

Built against the regenerated `module-03.json` (now 36 slides after Pass-7's notification-ordering split and affected-becomes-authorized restoration; was 33 after Pass-6's BLOCKER-1.1 and FRICTION-2.1 fixes), Phase 4b of the LOTO Pass-4 rework. Every candidate below was opened and visually checked against the new slide content — not filename-matched.

**Pass-6 update (FIX 6):** every file listed under "Rejected" and "Not individually viewed this pass" below has been moved to `courses/loto/_quarantine/module-03/img/` — out of the shipped package entirely, per audit NOTE 2.6. `s12-roles.jpg` (four-ring diagram) and `s13-documentation.jpg` (garbled text) are flagged there as unsafe to reuse without full regeneration. The "Reused" table below is now the complete, exact contents of the shipping `module-03/img/` directory.

**Pass-7 note (FIX C2):** the "Emergency Lock Removal" label below is relabeled to match the course's unavailability framing (the trigger was never a regulatory "emergency," per (e)(3)). **Slide numbers in this document are not reliable** — the 07-14 round-2 audit (NOTE 3.5) flagged them as predating an earlier renumber, and Pass-7 added three more slides (the notification split plus affected-becomes-authorized) without renumbering this table row by row, since several rows were already off before that change. Treat the "Slide" column as an approximate pointer, not ground truth — `module-03.json` is the ground truth for current slide position.

**Learner-language rework update (Pass 6, current):** `module-03.json` is now **32 slides**, not 36 — REWORK-2026-07-16.md §7 restructured the module into five movements (cuts, merges, one addition — the notification map, which carries no image by design). "The Critical Ones" slide (headcount/lock-removal zoom-in) was cut, its content folded into the two restoration-list slides' own item text; its image, `s06-headcount.jpg`, is no longer referenced and has been quarantined (`_quarantine/module-03/img/` — clean, reusable if that slide is ever reinstated separately). Every other image assignment in the table below is unchanged; the slides carrying them were moved, merged, or lightly rewritten in place, not cut. Same caveat as above applies with more force now — treat "Slide" numbers here as historical, not current.

## Reused (8 images — visually verified)

| Slide | Content | Image | Note |
|---|---|---|---|
| 2 | Cold open — shift change | `s01-shift-change.jpg` | Workers walking through a shift-change doorway, warm backlight. Clean, no text. |
| 3 | The Gap | `s02-gap-in-protection.jpg` | Closed, unlocked disconnect box; workers visible through a doorway in the background. Clean. |
| 5 | The Critical Ones (restoring equipment) | `s06-headcount.jpg` | Coordinator with clipboard, three workers raising hands — a literal headcount. Strong match. |
| 6 | Group Lockout | `s07-multiple-locks.jpg` | Four colored padlocks on one hasp, no text. Matches "each worker applies their own lock" well (script says five; four reads close enough, not a contradiction). |
| 7 | The Lockbox Method | `s09-lockbox-method.jpg` | Open lockbox with a key inside, three padlocks on the box. Excellent match, no text. |
| 8 | Shift Changes — Solution (overlap) | `s10-shift-overlap.jpg` | Two locks on one hasp together — visually IS the overlap concept. Strong match. |
| 14 | Removal When the Authorized Employee Is Unavailable | `s11-emergency-removal.jpg` | Single padlock on a disconnect, quiet empty facility, pliers on a workbench. Strong match, no text. |
| 29 | Callback closing / course recap | `s15-course-complete.jpg` | Worker walking away through a doorway, padlock on belt, dozens of padlocks visible on a panel. Strong symbolic close, no text. |

## Rejected — do not reuse

| Old file | Problem |
|---|---|
| `s12-roles.jpg` | **Explicitly flagged in the brief.** Shows **four** workers standing in concentric circles (orange/blue/yellow/white gear) — this is the old four-role diagram. The corrected script teaches **three** roles (authorized/affected/other) plus the qualified-person reframe. This image now asserts the exact error Phase 4 corrected. Must be regenerated as a three-ring diagram, not relabeled. |
| `s13-documentation.jpg` | Clipboard header reads **"LOCKLOUT TAG..."** — garbled ("LOCKOUT" misspelled with a doubled L), plus illegible scribbled handwriting in the body. Same defect class as Module 2's findings. The padlock in the same image is legibly labeled "LOCKOUT" (correct) but the clipboard's garbled header makes the overall asset unsafe to ship. |
| `s04-seven-steps.jpg` | Footprints on a factory floor — atmospheric, doesn't convey a seven-item list. Weak match for the "Restoring Equipment" list slide. |

## Not individually viewed this pass

`s03-four-minutes.jpg`, `s05-restoration-checklist.jpg`, `s08-coordinator.jpg`, `s14-complete-system.jpg` — not checked this pass given scope; default to NEW rather than assumed-reusable until visually verified.

## NEW — needs generation (at minimum, per the brief)

| Slide | Content | Why new |
|---|---|---|
| 18 | **Three-role concentric diagram** (was four) | **Explicitly flagged in the brief.** `s12-roles.jpg` shows the old four-person version — needs full regeneration as three rings, not a relabel. Highest priority: this is the module's visual thesis for the reframe. |
| 10 | **Cord-and-plug** — hand on the plug, not the tool | **Explicitly flagged in the brief.** New scope-exclusion content from Phase 4a; no prior art exists at all. |
| 11 | **Minor-servicing** — purpose-built clearing tool in use | **Explicitly flagged in the brief.** Same — brand new content. |
| 13 | **Testing/positioning** — five-step ordered sequence diagram | **Explicitly flagged in the brief.** Same — brand new content, procedural diagram treatment (same style as the six-steps/seven-steps visuals). |
| 4 | Restoring Equipment — nine-step list | `s04` rejected (footprints, weak match) |
| 16 | Removal when unavailable — three-elements list | No existing equivalent verified this pass |

## No image needed by design (remaining slides)

Typography-forward per the script's own tone notes ("When the standard flexes: precise, a little stern... no hedging"), or conventionally image-less types (title, list, summary, regulatory-quote slides matching M1's citation-slide convention): slides 1 (title), 9 (flexes intro), 12 (minor-servicing misuse reinforcement), 15 (not a coworker's call — source-citation slide), 17 (why notification matters), 19 (three roles intro — source-citation slide), 20 (authorized employees), 21 (affected employees), 22 (other employees — source-citation slide), 23 (qualified-person reframe — source-citation slide), 24 (different standard, different question), 25 (paperwork reframed), 26 (contractors info exchange — source-citation slide), 27 (paperwork thesis), 30 (course-in-one-line recap), 31 (summary).

## Priority for the next image-generation pass

1. **The three-role diagram (slide 18)** — top priority. This is both the module's stated visual thesis and the one place where shipping the *old* image would actively re-teach the error this whole phase corrected.
2. **The three "When the Standard Flexes" panels (slides 10, 11, 13)** — brand new content with zero prior art; currently these three load-bearing slides fall back to gradient backgrounds.
3. Everything else, as budget allows.
