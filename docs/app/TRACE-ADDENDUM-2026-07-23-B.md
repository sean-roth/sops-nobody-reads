# WORKFLOW-TRACE — record → spec for app v0 — T18–T19 addendum B (2026-07-23)

Fold into the master trace with addendum A at the next consolidation.

- **T18 — Plan-first convention's inaugural run; the rider caught a real bug.**
  Builder (fresh session, cold boot from repo) · brief + trace + repo state · Sean's
  new plan-first rule (invented 18:xx, executed 18:20 — plan committed before any
  code) · plan commit `3364bea` → fix `0c88c22` → harness `f03af55` (tools/capture,
  committed this time) → screenshots `06682f4` (branch-only by intent) · gate:
  handback, builder stopped before merge per seat model.
  **The tab-through rider earned its keep:** the original CSS `order` approach
  changes paint position but never Tab order — focus would have skipped the
  relocated controls. Fixed by physically relocating the three control nodes
  between bar and popover on breakpoint crossing (matchMedia-driven), so DOM order
  always matches the visible context. Caught pre-ship by a `getByRole` tab-through,
  not by eyeballing.
  *App notes: (1) a cold-booted builder oriented itself entirely from committed
  documents and proposed sound judgment calls — the coordination layer works
  without shared context, which is the app thesis demonstrated. (2) Riders on
  approval (the a11y check, evidence-not-construction for B4) are a distinct gate
  type the runner should support: orchestrator-added checks attached to a
  greenlight. (3) Measured self-checks (bounding boxes for tap targets, a11y tree
  via getByRole) beat visual assertion — encode in the brief template.*

- **T19 — Sean merged #83 pre-review (19:08Z, regular merge); post-merge eyes-on
  PASS.** Human · PR #83 + impatience with daylight · merge button (web, regular
  merge — screenshots commit came along to `main`, second occurrence after #80) ·
  mobile-nav live on `main` (`9981f5f`) · gate: publish fired before the review
  gates again; orchestrator verified state by read (commit graph), then ran the
  **eyes-on visual gate post-merge from the merged captures**: 360×800 light and
  dark, popover open — bar anatomy correct ([⋯][progress][Prev][Next], roomy),
  three relocated controls stacked and legible, tap-target heights visibly
  comfortable. **PASS**, one taste note for the CSS-cleanup pass: dark-mode popover
  border is subtle against the slide backdrop; consider a touch more elevation.
  Sean's "nothing yet" on his phone = three stacked caches (Pages rebuild → CDN
  ~10 min → browser-cached `chrome.css`/`player.js`, where 100% of this change
  lives). Third cache ambiguity today → **asset version-stamping promoted to the
  top of the housekeeping queue.**
  *App notes: (1) n=2 on the human pressing publish before review gates — the
  runner's merge affordance must show pending-gate state loudly enough that
  skipping is a choice (reaffirms T7). (2) External-asset caching breaks the
  human's own verify loop; a publish step that doesn't bust caches makes the
  gatekeeper distrust their eyes — version-stamp on publish is not polish, it's
  gate integrity. (3) Review gates ran post-merge from merged artifacts: order
  proved flexible, execution stayed mandatory — a legitimate degraded mode the
  runner should model rather than forbid.*

**Afternoon runbook (agreed shape):** (1) cold-audit sitting — #81 N1–N5, #82
V1–V4, hotfix mini-check, #83 B1–B5, one fresh session, kickoff template per
audit; (2) housekeeping pass — prune both screenshot dirs from `main`'s tree,
version-stamp the chrome asset links, delete audited branches; (3)
CHROME-CSS-CLEANUP (queued brief; add the popover-elevation taste note). Then the
reflection/spec session — after calls, not instead of them.
