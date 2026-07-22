# CHROME-CONSOLIDATION — builder brief (2026-07-21)

STATUS: READY FOR BUILD. Branch off current `main` (post-#79), never stacked. One PR.
Builder: Sonnet in Claude Code. Verification: a separate auditor session runs the §Audit checklist cold against the branch.

## Objective

Collapse the three self-contained module players onto **one shared chrome**, so any course-wide change — a bug fix, a palette or type-scale tweak, a container's treatment — lands once, not three times. This is a **pure refactor**: rendering identical before and after, content byte-identical, screens pixel-comparable.

The deck-wide nl2br fix is explicitly **NOT in this pass**. It follows as a one-file pass after this merges. Preserve the current (buggy) nl2br behavior exactly.

## Current layout (verify before touching)

```
courses/loto/builds/
  index.html                 ← course menu (on-brand since #77). OUT OF SCOPE
                                except relative asset paths if unavoidable.
  module-01.json / -02 / -03 ← per-module data, the parity mirror. MUST stay byte-identical.
  module-01/index.html + img/  (likewise -02, -03)
                             ← the three self-contained players (~50KB each:
                                inline styles + inline renderer + inline module data)
```

**Build step zero:** confirm this reading of the players' internals — where styles, renderer, and data actually sit in each file — and record it in the change note before extracting anything.

## Target layout

```
courses/loto/builds/
  chrome/
    tokens.css   ← palette, type scale, spacing variables ONLY — the client-swappable skin layer
    chrome.css   ← everything structural + epistemic: registers, shapes, scrim /
                    composite-contrast rules, layout, mode styling — the invariant layer
    player.js    ← renderer + behaviors (slide build, navigation, light/dark toggle,
                    Learner/Reviewer citation toggle), verbatim current behavior
  module-0N/index.html ← thin shell: links ../chrome/tokens.css + ../chrome/chrome.css,
                          loads ../chrome/player.js, carries the module's data INLINE
                          (script block) plus the mount
```

- **No `fetch()` for module data** — opening a module via `file://` must keep working.
- The tokens/chrome split is doctrine made literal: discipline lives in `chrome.css`, range lives in `tokens.css`. If a rule is ambiguous between the two, put it in `chrome.css` and flag it in the change note.

## Recipe

1. **Three-way diff the chrome first.** Styles vs. styles, script vs. script, across the three players. Expect near-identity (all three carry the washout selector fix and the stark-cut-scoped nl2br shim). Build a **divergence table**: every difference classified as either *accidental drift* (collapse to one canonical form) or *intentional module difference* (must move into module data or a data-attribute — never survive as forked chrome). An ambiguous divergence = STOP and flag it in the change note. Do not guess.
2. Extract into `chrome/` per the target layout, using the canonical forms from the divergence table.
3. Reduce each module `index.html` to the thin shell. The data script block's content is unchanged — do not reflow or reformat the data.
4. Menu untouched unless a relative path forces a one-line edit; if so, note it.

## Hard constraints

- `module-01.json`, `module-02.json`, `module-03.json`: byte-identical to `main`.
- Rendered text per module: word-multiset identical to `main`.
- Rendering identical: screenshot **every container type × light and dark × all three modules**, before and after — the full matrix, not a sample. (The M1 acceptance gate missed image-heavy dark-mode containers by sampling. We don't sample gates anymore.)
- nl2br behavior unchanged — headings render exactly as on `main`, bug intact.
- Plain HTML/CSS/JS. No framework, no build step.
- Branch off `main`. One PR.

## Handback (committed to the branch — no chat-artifact-only deliverables)

- `courses/loto/CHANGE-NOTE-chrome-consolidation.md` — the divergence table, file map before→after, the confirmed player-internals reading from step zero, and any judgment calls made.
- `courses/loto/screenshots/chrome-consolidation/` — the before/after matrix, filenames `m{01|02|03}-{container}-{light|dark}-{before|after}.png`.

## Audit checklist (separate auditor session, cold, against the branch)

- **A1** — the three `module-0N.json` files are byte-identical to `main`.
- **A2** — word-multiset of rendered text per module is identical to `main`.
- **A3** — chrome exists in exactly one place: grep the three shells for `<style>` blocks, style rules, and renderer logic; anything beyond data + mount + links must be listed as an allowed exception in the change note.
- **A4** — menu and all three shells reference `chrome/` relatively; open via `file://` AND via a static server; both work.
- **A5** — screenshot matrix is complete (container × mode × module, before/after); every pixel diff is explained, or the pass is rejected.
- **A6** — nl2br: headings identical to `main` (bug intact).
- **A7** — divergence table accounts for every difference between the old three players, classified; no unexplained collapse.
