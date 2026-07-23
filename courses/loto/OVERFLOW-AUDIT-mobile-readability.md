# Overflow audit — before -> after

Generated from `overflow-before.json` and `overflow-after.json`. Cell format: before→after.
`ok` = fits. `V-clip`/`**STUCK**` = vertical overflow, before/after (STUCK = backstop did not reach the bottom — a real failure).
`scrolls` = vertical overflow but the backstop makes it fully reachable (expected/fine). `H-CLIP` = horizontal overflow (the backstop cannot fix this; it must not appear after the fix).

**Caveat:** the "before" column's scroll-reachability isn't meaningful — `overflow: hidden` still lets JS set `scrollTop` (it just gives no user-facing scroll affordance), so "before" is reported as clipped/not-clipped only, never as stuck. Only the "after" column's scrolls/STUCK distinction is a real signal.

## module-01

| Waypoint | 390x844/light | 390x844/dark | 360x800/light | 360x800/dark | 390x704-chrome/light | 390x704-chrome/dark | 360x660-chrome/light | 360x660-chrome/dark |
|---|---|---|---|---|---|---|---|---|
| close | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-1 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-2 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-3 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-4 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-1 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-2 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-3 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-4 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-5 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-6 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-7 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-8 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-9 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-10 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-11 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-12 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-13 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-14 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-15 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-16 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-17 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-18 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-19 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-20 | ok→ok | ok→ok | ok→ok | ok→ok | V-clip→ok | V-clip→ok | V-clip→ok | V-clip→ok |
| slide-21 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-22 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-23 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-24 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-25 | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok |

## module-02

| Waypoint | 390x844/light | 390x844/dark | 360x800/light | 360x800/dark | 390x704-chrome/light | 390x704-chrome/dark | 360x660-chrome/light | 360x660-chrome/dark |
|---|---|---|---|---|---|---|---|---|
| close | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-1 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-2 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-3 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-4 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-1 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-2 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-3 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-4 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-5 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-6 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-7 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-8 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-9 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-10 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-11 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-12 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-13 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-14 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-15 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-16 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-17 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-18 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-19 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-20 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-21 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-22 | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok |

## module-03

| Waypoint | 390x844/light | 390x844/dark | 360x800/light | 360x800/dark | 390x704-chrome/light | 390x704-chrome/dark | 360x660-chrome/light | 360x660-chrome/dark |
|---|---|---|---|---|---|---|---|---|
| close | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-1 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-2 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-3 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| quiz-4 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-1 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-2 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-3 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-4 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-5 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-6 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-7 | V-clip→ok | V-clip→ok | V-clip→ok | V-clip→ok | V-clip→ok | V-clip→ok | V-clip→scrolls | V-clip→scrolls |
| slide-8 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-9 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-10 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-11 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-12 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-13 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-14 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-15 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-16 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-17 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-18 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-19 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-20 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-21 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-22 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-23 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-24 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-25 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-26 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-27 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-28 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-29 | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok | ok→ok |
| slide-30 | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok | H-CLIP→ok |

## Summary

- Total checks: 736
- Clipped before: 36
- Clipped after: 2 (0 stuck-and-unscrollable)
