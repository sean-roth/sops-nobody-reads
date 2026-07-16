# Quarantine — rejected/unreferenced LOTO image assets

Per LOTO Pass-6 (FIX 6 / audit NOTE 2.6): these images were removed from the shipping
`courses/loto/builds/module-0X/img/` directories because no player references them.
Moved here rather than deleted, so nothing is destroyed irreversibly — this folder sits
outside every module's shipped package, so it will not be bundled into a SCORM zip or
served by any player.

Two of these are **specifically rejected for content defects**, not just unused:

- `module-03/img/s12-roles.jpg` — the old four-ring roles diagram. Shows four workers
  standing in concentric circles, which is the exact error the Phase 4 three-role
  reframe corrected. Do not reuse under any circumstances without full regeneration.
- `module-03/img/s13-documentation.jpg` — clipboard header reads "LOCKLOUT TAG..."
  (garbled, doubled L). Do not reuse without regeneration.

The rest are simply orphaned — leftovers from earlier build iterations whose slide
structure changed (Module 1 and 2's cold-open sequences were rebuilt in Phase 1/2;
Module 3's restoration/lockbox/roles sections were rebuilt in Phase 4b) or whose text
came out garbled at generation time (see each module's `builds/module-0X-image-
manifest.md` for the full per-image verification record). None of these were verified
as reusable; treat everything in this folder as needing a fresh look — not a quick
relabel — before it goes anywhere near a shipped build.

**Do not restore any file from this folder into a `module-0X/img/` directory without
first checking it against the current script and JSON** — several of these were built
for narrative beats or taxonomies that no longer exist in the course.

## `module-01/img/s07-electrical-panel.jpg`, `s08-mechanical-parts.jpg`; `module-03/img/s06-headcount.jpg` (added learner-language rework, Pass 6)

Orphaned by the rework's slide merges/cuts, not content defects. M1's "Electrical Energy"
and "Mechanical Energy" slides merged into "The Ones You Already Know" (keeping only the
surviving slide's own image, per REWORK-2026-07-16.md §2/§12: image refs may move with a
slide or drop on merge, no new images). M3's "The Critical Ones" slide was cut entirely,
its emphasis folded into the restoration list items' own text. All three images are clean
and reusable if a future pass regenerates the merged slides into separate ones again —
check against the current script and JSON first, same rule as everything else here.

## `IMAGE-PROMPTS.md` (added Pass-7, FIX C2)

Not an image — the pre-rework prompt/planning document, moved here whole because it sat
in `builds/` implying it was current when it wasn't: wrong filenames throughout (none
match any shipped image), stale "five energy"/"five locks"/"four roles (incl.
Qualified)"/"Emergency Lock Removal" language, and a seven-step restore checklist. Three
audits caught the drift before anyone moved it. The per-module
`builds/module-0X-image-manifest.md` files are the current source of truth for what each
slide's image is and why.
