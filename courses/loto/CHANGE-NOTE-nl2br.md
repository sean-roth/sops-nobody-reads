# CHANGE NOTE — LOTO nl2br deck-wide fix (NL2BR-PASS, 2026-07-23)

One-file fix: `nl2br()` in `courses/loto/builds/chrome/player.js` now honors the
real newlines that `MODULE` heading text carries, rendering each as a `<br>`.
This is the deck-wide fix the chrome-consolidation pass set up and deliberately
excluded (`CHANGE-NOTE-chrome-consolidation.md` §A6).

Branch: `loto-nl2br-fix`, off `origin/main` (`3f547d9`, the pass merge-base).
Scope held to `player.js` only — no CSS, no shells, no data, no menu.

---

## The fix

```js
// before  (matches a literal backslash-n two-char sequence — never present at runtime)
function nl2br(s) { return (s || '').replace(/\\n/g, '<br>'); }

// after   (matches a real U+000A newline)
function nl2br(s) { return (s || '').replace(/\n/g, '<br>'); }
```

One character removed (one backslash). Root cause (BUILD-LESSONS, 07-21): each
module shell inlines `const MODULE = { … "heading": "The Energy\nYou Don't See" … }`
as a JS object literal, so the `\n` is parsed into a **real newline character** at
runtime. The old regex `/\\n/g` matches the two-character sequence backslash-`n`,
which the parsed string never contains — so the replace silently no-op'd and every
intended heading break collapsed to whitespace (and then to natural word-wrap).

The top-of-file comment and an inline comment were updated to match (they
previously instructed "Do not 'fix' it here"). No other logic changed.

---

## Every consumer of `nl2br()` (enumerated, per the recipe)

`nl2br()` is called on exactly **one field — `slide.heading`** — at five render
sites in `renderSlide()`. No other field (body, subtitle, label, boxText, kicker,
figure, items, options, quiz, close) flows through it.

| Render case (`slide.type` / shape) | Element | Uses `nl2br`? |
|---|---|---|
| `title` | `<h1>` | ✅ yes |
| `teaching-caption` (default) | `<h2>` | ✅ yes |
| `teaching-caption` (`shape: figure`) | `.figure-caption` | ✅ yes |
| `misconception-held-up` | `.misconception-quote` | ✅ yes |
| `reveal` | `<h2>` | ✅ yes |
| `consolidation` | `<h2>` | ❌ **bypasses** — `${slide.heading}` raw |
| `options` | `<h2>` | ❌ **bypasses** — `${slide.heading}` raw |

`consolidation` and `options` headings never called `nl2br` and still don't. This
is safe because **their heading data contains no newlines** (`"The Six Steps"`,
`"Module 1 — Key Concepts"`, `"Who Gets Told, When"`, …) — verified across all
three modules (see the 7 `(bypass)` rows in the table, all `data \n = 0`). Their
behavior is unchanged by this pass, exactly as intended.

There is also a literal `<br>` in `renderClose()` (`… questions correct<br>`) — it
is a hard-coded template break, not routed through `nl2br`, and is untouched.

---

## Key finding — the stark-cut CSS interaction (why 28 headings change and 6 don't)

`chrome.css` (lines ~493–507) already carried a **scoped workaround** for this
exact bug: `.slide.shape-stark-cut h2 { white-space: pre-line; }`, with a comment
stating *"nl2br() is a pre-existing no-op … so every heading's intended breaks
have always silently collapsed to natural wrap … Scoped to this shape only —
flagged, not fixed deck-wide (out of pass)."*

Consequence, confirmed by the byte-level screenshot comparison:

- **6 stark-cut headings that carry newlines** (M1/16, M1/23, M2/2, M2/20, M3/3,
  M3/28) already rendered their breaks via `white-space: pre-line`. After the fix
  the newline becomes a `<br>` and `pre-line` has nothing left to act on, so they
  render **byte-identical** before/after (no double-break, no regression).
- **28 non-stark-cut headings that carry newlines** had no such workaround — their
  breaks genuinely word-wrapped. These now break at the intended points. All 56
  differing screenshots (28 slides × light+dark) are these.
- The stark-cut comment claimed the collapse was *"invisible at teaching-caption/
  reveal scale."* The before/after matrix shows that assumption does **not** hold
  for multi-line headings — e.g. M1/7 `Electrical. ⏎ Mechanical. ⏎ Hydraulic.
  Pneumatic.` rendered as 2 wrong lines before, 3 correct lines after.

**Follow-up (out of this pass's scope — CSS):** with `nl2br` fixed, the stark-cut
`white-space: pre-line` rule and its comment in `chrome.css` are now redundant and
stale. Recommend a separate CSS pass to remove the rule and retire the comment's
"flagged, not fixed" note. Left untouched here to honor "player.js only."

---

## Full-deck per-heading verification (M1–M3, complete, not sampled)

`⏎` marks a real newline in the `MODULE` data. Re-derivable: for any row,
`MODULE.slides[Slide].heading`. Every row: rendered `<br>` == data `\n`, and the
pre-fix `<br>` count was 0.

| Module | Slide | Type | Heading (⏎ = newline in data) | data `\n` | rendered `<br>` (after) | Visual before→after | OK |
|---|---|---|---|---|---|---|---|
| M1 | 0 | title | The Energy ⏎ You Don't See | 1 | 1 | changed | ✅ |
| M1 | 4 | reveal | He stopped the machine. ⏎ He didn't secure it. | 1 | 1 | changed | ✅ |
| M1 | 5 | misconception-held-up | LOTO is just putting ⏎ a padlock on a breaker | 1 | 1 | changed | ✅ |
| M1 | 7 | teaching-caption | Electrical. ⏎ Mechanical. ⏎ Hydraulic. Pneumatic. | 2 | 2 | changed | ✅ |
| M1 | 9 | reveal | Off at the switch. ⏎ Still live inside. | 1 | 1 | changed | ✅ |
| M1 | 12 | teaching-caption/figure | doesn't vanish ⏎ because you closed the valve. | 1 | 1 | changed | ✅ |
| M1 | 14 | reveal | The most common way ⏎ stored energy kills. | 1 | 1 | changed | ✅ |
| M1 | 15 | teaching-caption | Not one energy source. ⏎ Potentially all six. | 1 | 1 | changed | ✅ |
| M1 | 16 | reveal/stark-cut | "Off" is a button ⏎ you push. ⏎ "Safe" is a process ⏎ you complete. | 3 | 3 | identical — CSS pre-line | ✅ |
| M1 | 18 | teaching-caption | Isolation stops new energy ⏎ from entering. | 1 | 1 | changed | ✅ |
| M1 | 19 | consolidation (bypass) | The Six Steps | 0 | 0 | identical — no ⏎ | ✅ |
| M1 | 20 | teaching-caption | Simple is exactly ⏎ what makes it dangerous. | 1 | 1 | changed | ✅ |
| M1 | 23 | reveal/stark-cut | Two minutes. ⏎ Four ounces. | 1 | 1 | identical — CSS pre-line | ✅ |
| M1 | 24 | consolidation (bypass) | Module 1 — Key Concepts | 0 | 0 | identical — no ⏎ | ✅ |
| M2 | 0 | title | The Six Steps | 0 | 0 | identical — no ⏎ | ✅ |
| M2 | 2 | reveal/stark-cut | A sign is not ⏎ a lock. | 1 | 1 | identical — CSS pre-line | ✅ |
| M2 | 3 | teaching-caption | Six steps. ⏎ Each one closes ⏎ a different gap. | 2 | 2 | changed | ✅ |
| M2 | 5 | teaching-caption | Notify everyone ⏎ affected. | 1 | 1 | changed | ✅ |
| M2 | 9 | teaching-caption | Each worker applies their own lock. Each lock has one key. | 0 | 0 | identical — no ⏎ | ✅ |
| M2 | 10 | reveal | Your lock. ⏎ Your key. ⏎ Your guarantee. | 2 | 2 | changed | ✅ |
| M2 | 13 | reveal | Sometimes step five ⏎ isn't a one-time check. | 1 | 1 | changed | ✅ |
| M2 | 15 | consolidation (bypass) | The Excuses | 0 | 0 | identical — no ⏎ | ✅ |
| M2 | 16 | reveal | Most of the time, ⏎ nothing bad happens. | 1 | 1 | changed | ✅ |
| M2 | 17 | teaching-caption | Simple enough that ⏎ there's no good reason ⏎ not to do it. | 2 | 2 | changed | ✅ |
| M2 | 20 | reveal/stark-cut | A sign is a request. ⏎ A lock is a fact. | 1 | 1 | identical — CSS pre-line | ✅ |
| M2 | 21 | consolidation (bypass) | Module 2 — Key Concepts | 0 | 0 | identical — no ⏎ | ✅ |
| M3 | 0 | title | When Simple ⏎ Gets Complicated | 1 | 1 | changed | ✅ |
| M3 | 3 | reveal/stark-cut | New lock on. ⏎ Then old lock off. | 1 | 1 | identical — CSS pre-line | ✅ |
| M3 | 5 | teaching-caption | One lock on the machine. ⏎ The key goes in a box. ⏎ Everyone locks the box. | 2 | 2 | changed | ✅ |
| M3 | 6 | consolidation (bypass) | Before It Restarts | 0 | 0 | identical — no ⏎ | ✅ |
| M3 | 7 | reveal | Re-energize. ⏎ Then tell them ⏎ it's done. | 2 | 2 | changed | ✅ |
| M3 | 8 | options (bypass) | Who Gets Told, When | 0 | 0 | identical — no ⏎ | ✅ |
| M3 | 11 | reveal | The lock removal isn't ⏎ complete until they know. | 1 | 1 | changed | ✅ |
| M3 | 12 | teaching-caption | The standard draws ⏎ its own boundaries ⏎ in three places. | 2 | 2 | changed | ✅ |
| M3 | 14 | reveal | Minor servicing — ⏎ read the fence twice. | 1 | 1 | changed | ✅ |
| M3 | 15 | teaching-caption | "Clearing a jam" ⏎ is the classic misuse. | 1 | 1 | changed | ✅ |
| M3 | 18 | teaching-caption | One performs ⏎ the lockout. ⏎ One never restarts it. | 2 | 2 | changed | ✅ |
| M3 | 20 | misconception-held-up | Authorized. Affected. Other. ⏎ And qualified person makes four. | 1 | 1 | changed | ✅ |
| M3 | 21 | reveal | "Qualified person" ⏎ lives in electrical safety. | 1 | 1 | changed | ✅ |
| M3 | 22 | reveal | Your role can change ⏎ with your duties. | 1 | 1 | changed | ✅ |
| M3 | 27 | reveal | The difference is ⏎ thirty seconds ⏎ and a padlock. | 2 | 2 | changed | ✅ |
| M3 | 28 | teaching-caption/stark-cut | Six sources. ⏎ Six steps. ⏎ Three roles. | 2 | 2 | identical — CSS pre-line | ✅ |
| M3 | 29 | consolidation (bypass) | Module 3 — Key Concepts | 0 | 0 | identical — no ⏎ | ✅ |

### Per-module totals

| Module | Slides | `<br>` before | `<br>` after | nl2br headings w/ ⏎ | Word-multiset sha | Word-multiset |
|---|---|---|---|---|---|---|
| M1 | 25 | 0 | 15 | 12 | `65f9b065884c` | unchanged ✅ |
| M2 | 22 | 0 | 11 | 8 | `366af447a99c` | unchanged ✅ |
| M3 | 30 | 0 | 20 | 14 | `ece64b42788d` | unchanged ✅ |

Totals: **46 `<br>` introduced** (0 before), across **34 newline-bearing headings**;
**28** visually change, **6** (stark-cut) were already correct via CSS, **9**
zero-newline heading slides are untouched.

---

## Verification method (reproducible; a cold auditor still runs §Audit)

Captured with a headless Chromium harness serving the repo over HTTP, driving each
module player slide-by-slide. Deterministic: transitions/animations disabled,
`document.fonts.ready` awaited, background images preloaded, two-frame settle.
BEFORE captured from `origin/main`'s pristine `player.js`; AFTER from this branch.

| Check | Method | Result |
|---|---|---|
| **`<br>` == data newlines** | per heading, rendered `<br>` count vs `(heading.match(/\n/g)||[]).length` | **PASS** — every row; 15/11/20 per module |
| **No-op before** | pre-fix rendered `<br>` in every nl2br heading | **PASS** — 0 across all three modules |
| **Structural invariant** | for every slide, `normalize(after) === normalize(before)` where `normalize` maps `<br> → \n` | **PASS** — only `<br>`↔`\n` differs anywhere; no other DOM change |
| **Word-multiset / module** | rendered slide text, `<br>` treated as the word boundary the newline was, lowercased tokens sorted + SHA1 | **PASS** — sha identical before/after (see totals) |
| **Bypass headings** | `consolidation`/`options` headings: data `\n` and rendered `<br>` | **PASS** — both 0, unchanged |
| **Visual matrix** | byte-hash of each heading slide's light+dark PNG, before vs after | **PASS** — 56 pairs differ (all newline headings), 30 identical |

Note on word-multiset: `textContent` fuses the two words across a `<br>` (it emits
no whitespace), so a naive count *appears* to drop by the number of newlines that
sat between two word-characters (M1: exactly 8). That is a measurement artifact,
not a content change — `<br>` is the same word boundary the real newline was. The
structural invariant (which is strictly stronger) confirms nothing but `<br>`↔`\n`
differs anywhere in any slide.

---

## Audit checklist mapping (brief §Audit — pre-merge self-check)

- **N1** — diff confined to `chrome/player.js` + this change note. Screenshots are
  in a **separate commit** (`courses/loto/screenshots/nl2br/`) so they strip with a
  single `git revert`/cleanup commit before squash-merge.
- **N2** — per-heading table above is complete and re-derivable from `MODULE`.
  Independent spot-verify (2/module): M1/0 `The Energy⏎You Don't See` (1), M1/7
  `Electrical.⏎Mechanical.⏎Hydraulic. Pneumatic.` (2); M2/10 `Your lock.⏎Your
  key.⏎Your guarantee.` (2), M2/3 `Six steps.⏎Each one closes⏎a different gap.`
  (2); M3/5 lockbox (2), M3/27 `The difference is⏎thirty seconds⏎and a padlock.`
  (2). All match.
- **N3** — word-multiset ×3 unchanged vs baseline (`origin/main`). **PASS** (shas
  above; method noted).
- **N4** — no rendering change outside heading line-wrapping. **PASS** — the 56
  differing pairs are all newline-bearing headings reflowing (plus the consequent
  re-centering of the vertically-centered slide, which is caused *by* the heading
  reflow); the structural invariant proves no non-`<br>` DOM change anywhere.
- **N5** — the helper's only consumer is `slide.heading` (5 sites). No other field
  behaves differently. The one adjacent interaction — stark-cut `white-space:
  pre-line` — is documented above and produces byte-identical output.

---

## Handback

- `courses/loto/builds/chrome/player.js` — the fix (+ comment updates).
- `courses/loto/CHANGE-NOTE-nl2br.md` — this note.
- `courses/loto/screenshots/nl2br/` — 172 PNGs: every heading-bearing slide
  (43) × light/dark × before/after. Named
  `m0N-idxII-<type>-<light|dark>-<before|after>.png`. **Branch-only; strip before
  squash-merge** (separate commit, per convention).
- After merge: GitHub Pages rebuilds `/demo` in ~1–2 min — spot-check one fixed
  heading (e.g. M1 slide 8, `Electrical. / Mechanical. / Hydraulic. Pneumatic.`).
