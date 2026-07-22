# CHANGE NOTE — LOTO chrome consolidation (2026-07-21)

Pure refactor: the three self-contained LOTO module players now share one
chrome (`courses/loto/builds/chrome/`). Rendering is identical before/after,
content byte-identical, screens pixel-comparable. The deck-wide nl2br fix is
**not** in this pass — the pre-existing no-op is preserved exactly.

Branch: `chrome-consolidation`, off `origin/main` post-#79 (`a61bfe0`).

---

## Step zero — confirmed reading of the players' internals

All three `module-0N/index.html` shared one exact anatomy (verified by line
markers + three-way diff, not assumption):

| Region | M1 lines | M2 lines | M3 lines | Content |
|---|---|---|---|---|
| `<head>` | 1–6 | 1–6 | 1–6 | meta + per-module `<title>` |
| `<style>` | 7–775 | 7–769 | 7–769 | all CSS (tokens + structural, mixed) |
| body DOM | 778–796 | " | " | `.player` > slide mount + bottom-bar/nav |
| `const MODULE = {…}` | 799–1075 | 793–1022 | 793–1152 | inline slide/quiz data |
| renderer | 1076–1435 | 1023–1382 | 1153–1512 | state, render fns, nav, `window.API` |

Additional confirmed facts:

- The inline `const MODULE` object was **byte-for-byte deep-equal to the frozen
  `module-0N.json`** in all three modules (verified by parse + `JSON.stringify`
  compare). The "parity mirror" was literally in sync — and this refactor keeps
  it that way (see Judgment call 1).
- The body DOM (`.player` + bottom-bar/nav) was **byte-identical across all
  three modules** (`diff` clean). Only `<title>` differed in `<head>`.

---

## Divergence table (three-way diff — complete, not sampled)

Every difference between the old three players, classified. Nothing was left
unexplained; nothing ambiguous was guessed (the brief's STOP rule never fired).

### CSS — zero rule differences

The `<style>` blocks differ by **comment prose only** — no style rule differs
anywhere across the three. Canonical form: M1 (it already carried the fuller,
module-agnostic comments).

| # | Divergence | Class | Resolution |
|---|---|---|---|
| D1 | `seqRows` comment: M3 names its own "Before It Restarts" 7-item sequence; M1/M2 use module-agnostic wording | accidental drift | keep M1's module-agnostic wording in `chrome.css` |
| D2 | `nl2br` no-op comment: M1 has the full explanation, M2/M3 a one-line truncation | accidental drift | keep M1's fuller comment in `chrome.css` |

### Renderer — identical logic, 3 content items were hard-coded in code

The renderer logic was identical across all three. Three **content** items were
forked inside each player's render code (not in `MODULE`, not in `.json`):

| # | Divergence | Class | Resolution |
|---|---|---|---|
| D3 | `getQuizFeedback()` `feedbacks[]` — the per-question quiz explanations | intentional module difference | moved to per-module `MODULE_CHROME.feedbacks` |
| D4 | `renderClose()` next-module link `href` + label (`../module-02/…` / "Next Module" vs `../index.html` / "Course Complete") | intentional module difference | moved to `MODULE_CHROME.nextHref` / `.nextLabel` |
| D5 | `renderClose()` `.close-note` text ("Module N of 3 — …") | intentional module difference | moved to `MODULE_CHROME.closeNote` |

D3–D5 **had** to leave the renderer or `player.js` would stay forked. They are
the only per-module differences in behavior; everything else in the renderer is
now shared verbatim.

---

## File map (before → after)

```
BEFORE                                   AFTER
builds/module-0N/index.html  (~50KB)  →  builds/module-0N/index.html  (thin shell, 12–23KB)
  <style> …760 lines…                    builds/chrome/tokens.css   (skin: :root + :root.dark + font @import)
  body: .player + bottom-bar             builds/chrome/chrome.css   (structural + epistemic; the invariant layer)
  const MODULE = {…}                     builds/chrome/player.js    (renderer + behaviors; injects the nav DOM)
  360-line renderer
```

Each thin shell now contains exactly: `<head>` (+title), two `chrome/*.css`
links, `<div id="app">` mount, an inline `<script>` with the **verbatim,
unreflowed** `const MODULE` block + a `const MODULE_CHROME` block, and
`<script src="../chrome/player.js">`.

### tokens.css vs chrome.css split (doctrine made literal)

- **tokens.css** — `:root` (light) + `:root.dark` custom properties (palette,
  type scale, spacing) and the font `@import`. The client-swappable skin.
  Includes the on-image scrim *color values* (`--onimage-scrim-*`) — they are
  values, so they live here; the scrim *rule* that consumes them lives in chrome.
- **chrome.css** — everything from the `*` reset onward: registers, shapes, the
  `.slide.has-image::before` scrim/composite-contrast rules, layout, mode
  styling, nav chrome, responsive. The invariant layer.

No rule was ambiguous between the two, so the "when in doubt, chrome.css" tie-break
was not needed.

---

## Judgment calls

1. **`MODULE_CHROME` kept separate from `MODULE` (D3–D5 placement).** The frozen
   `.json` is byte-locked by A1, and inline `MODULE` was deep-equal to it. Rather
   than fold the relocated fields into `MODULE` (which would break that equality),
   they go in a separate `const MODULE_CHROME` object in each shell. Result:
   `MODULE` stays deep-equal to its `.json` (parity mirror intact, A1 self-evident),
   and the forked content still left `player.js`. The three strings moved verbatim,
   so rendered text is unchanged (A2). Note for a future pass: these are arguably
   content and could be reconciled into the `.json` when the freeze lifts.

2. **The bottom-bar/nav DOM moved into `player.js` (`mountChrome()`).** It was
   ~18 lines of identical markup duplicated in each player. To make chrome truly
   single-source, `player.js` now injects it into the shell's single `#app` mount,
   so the shell body is just `<div id="app"></div>`. This is the truest reading of
   the target layout ("data INLINE plus the mount") and avoids an A3 exception.

3. **New rule `#app { height: 100% }` added to chrome.css.** Introducing the `#app`
   wrapper broke the height chain: in the old players `.player` (height:100%) was a
   direct child of `<body>`; wrapped in an auto-height `#app`, `.player` collapsed
   and every absolutely-positioned `.slide` rendered at 0 height (blank). The new
   rule restores the height context. **This bug was caught by the full before/after
   screenshot matrix** — it manifested as blank slides with the bottom-bar riding at
   the top of the page. It is the only genuinely new CSS rule in the refactor; every
   other rule is verbatim from the old players.

---

## Verification (self-check; a separate cold auditor still runs §Audit)

| ID | Check | Result |
|---|---|---|
| A1 | `module-0N.json` byte-identical to `origin/main` | **PASS** — git blob hashes MATCH for all three |
| A2 | Rendered-text word-multiset per module == main | **PASS** — sorted word-multiset SHA1 identical (1334 / 1213 / 1759 words; reviewer-mode citations + quiz feedback included) |
| A3 | Chrome in exactly one place | **PASS** — shells contain 0 `<style>`, 0 inline `style=`, 0 renderer logic; only 2 css links + player.js + mount + data |
| A4 | Relative refs; file:// and static server both work | **PASS** — all refs `../chrome/…`; full click-through (all slides + quiz + close), dark + reviewer toggles, no page errors, over both `file://` and `http://` |
| A5 | Screenshot matrix complete; pixel diffs explained | **PASS** — container × mode × module, before/after (132 png). All 66 before/after pairs diff **0.0000%** after the height fix |
| A6 | nl2br headings identical (bug intact) | **PASS** — `nl2br` verbatim in player.js (`/\\n/g` no-op); heading slides pixel-identical |
| A7 | Divergence table accounts for every difference | **PASS** — D1–D5 above; every diff classified, no unexplained collapse |

### Screenshot matrix

`courses/loto/screenshots/chrome-consolidation/`,
`m{01|02|03}-{container}-{light|dark}-{before|after}.png`. Container types
captured per module (first occurrence of each present type) plus `quiz`,
`quiz-answered`, and `close`. BEFORE captured from `origin/main` (pristine
worktree); AFTER from this branch. Captures are deterministic (fonts.ready
awaited, background images preloaded, transitions disabled, two-frame settle).
