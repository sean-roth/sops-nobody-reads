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
