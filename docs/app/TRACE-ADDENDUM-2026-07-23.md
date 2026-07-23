# WORKFLOW-TRACE — record → spec for app v0 — T12–T17 addendum (2026-07-23)

Appended as a dated addendum to keep the day's main-file churn low; fold into the
master trace at the next consolidation.

- **T12 — NL2BR handback verified; merge staged (PR #81).** Orchestrator · PR #81 file
  list + `player.js` patch + `CHANGE-NOTE-nl2br.md` (no images loaded — context care per
  Sean) · builder handback · verdict: **conforms** — the one-character fix (`/\\n/g` →
  `/\n/g`) plus honest comment updates confirmed in the patch; scope held to `player.js`
  + change note; 172 PNGs isolated in their own commit (`e340565`); consumer enumeration
  complete (5 heading render sites, 2 documented bypasses with zero-newline data);
  stark-cut `pre-line` interaction fully explained (why 28 headings change and 6 don't);
  word-multiset measurement artifact disclosed and superseded by the strictly stronger
  structural invariant · outputs: `CHROME-CSS-CLEANUP-QUEUED.md` committed (post-demo
  queue; orchestrator keeps the brief-writing seat) · gate: strip `e340565` (local
  revert — the MCP file tools cannot delete), then Sean's go → orchestrator
  squash-merges → publish.
  *App notes: (1) the builder held the merge back unprompted — gate ordering is becoming
  culture, not just instruction. (2) Commit-splitting gate artifacts (deliverable commit
  + strippable artifact commit) is the cleaner form of the convention — encode in the
  brief template. (3) The runner needs a delete-capable git transport; file-level write
  tools can't strip artifacts. (4) The change note falsified a standing code comment's
  claim ("invisible at teaching-caption/reveal scale") — handbacks can falsify existing
  annotations, so audits should diff change-note claims against standing comments, not
  just against code.*

- **T13 — PR #81 squash-merged; /demo published with the nl2br fix (2026-07-23).**
  Orchestrator (on Sean's go) · clean PR head (fix + change note only; screenshots
  preserved on branch `loto-nl2br-fix` at `e340565` for the cold audit) · Sean's go ·
  squash commit `91505ea` on `main`; **post-merge read-back verified** (main's
  `player.js` carries the fixed pattern; change note live at 200) · gate: human go
  exercised; cold audit N1–N5 pending, same-day. **First attempt failed in transport:**
  the MCP bridge died mid-call (4-min timeout, unknown whether the merge fired). The
  orchestrator did NOT retry blind — it probed actual state through an independent
  read-only path (raw CDN: old regex still on `main`, change note 404 → definitively
  not merged), reported, and retried only after Sean restarted the bridge. Branch
  deliberately retained (no `--delete-branch`) until the audit closes.
  *App notes: (1) merge-class actions are world-visible and non-idempotent in effect —
  after any transport failure the runner MUST verify state by read before retrying;
  "check, then retry" is a hard rule, not a courtesy. (2) The runner needs a state-probe
  path independent of its write path (here: raw CDN answered when both the MCP bridge
  and the unauthenticated API — rate-limited — could not). (3) Sean's "I need to learn
  git better / I'm getting lost in the commands" is spec evidence, not a user deficit:
  the human seat should press gates, never conjugate git — the runner owns transport.
  Interim mitigation queued: a one-page driver's cheat sheet of the ~6 recurring
  commands.*

- **T14 — PR #82 squash-merged; demo cut live (2026-07-23).** Builder-as-transport on
  Sean's word (the go is the gate; who types is transport) · stripped PR head (menu +
  change note; 4 screenshots reverted on-branch) · Sean's go · demo cut on `main` —
  **confirmed by read-back** (menu on `main` carries the four `coming-soon`
  occurrences) · gate: exercised; cold audit V1–V4 pending, same-day.

- **T15 — Human device check → two defects → hotfix lane (2026-07-23).** Human + orchestrator ·
  Sean's manual click-through of the live demo · quality eye · defects: (a) stark-cut
  slide with a **four-line intended heading** overflows its caption at desktop widths —
  data was rendering *faithfully*; the shape's own comment assumes "one or two lines";
  before/after were identically overflowing, so the pixel-diff matrix passed it; (b) the
  M1 close slide's "Next Module" leaked into greyed-out M2 — pure `MODULE_CHROME` data.
  Fix: one clamp value (`clamp(2.4rem, 6vw, 4.5rem)`) + three data fields (close routes
  to the menu, note reads "Modules 2 and 3 are coming soon"). Landed by the builder
  direct to `main`; orchestrator verified on `main` including a full cascade check (no
  overriding h2 rule, no media-query interference) · gate: Sean's live check.
  *App notes: (1) **diff gates detect change; quality gates judge the render** — they
  are different instruments and the runner needs both lanes. (2) `MODULE_CHROME`
  earned its keep: a business-state change (demo cut) reached the close screen as a
  three-line data edit, no code — and this text changing for business reasons is live
  evidence for DECISIONS-NEEDED item 4. (3) A **hotfix lane** is now defined practice:
  human-directed, a-few-lines, direct commit, live-verified, audit-backfilled same day.*

- **T16 — False alarm resolved; three real lessons kept (2026-07-23).** Human +
  orchestrator · Sean's phone re-check · — · the stark-cut fix is correct **on the
  canonical surface**: phone-vertical, where prospects actually look — desktop was the
  misleading view · gate: closed by device check.
  *App notes: (1) the consolidation silently changed the caching profile — styles moved
  from inline (always fresh) to an external shared asset that browsers and the Pages
  CDN (~10 min) cache; queued: **version-stamped asset links at publish** so "deployed"
  always means "visible." (2) The builder session crash cost nearly nothing — briefs,
  change notes, and commits all live in the repo and a fresh session boots cold; the
  one real loss was the uncommitted headless-Chromium capture harness → new rule:
  **verification harnesses are infrastructure; commit them under `tools/`**, same as
  prompts. (3) Device-first review order: check the prospect surface before the
  developer surface.*

- **T17 — Phone check catches the real blocker: bottom-bar overflow (2026-07-23).**
  Human → orchestrator · Sean's device check + bar anatomy pulled from live files
  (three-button left cluster + fixed 180px progress + Prev/Next ≈ 600px into a 390px
  row) · quality eye · `MOBILE-NAV-2026-07-23.md` committed — Sean's design call: at
  phone widths the left trio (Learner/Reviewer · Dark · Menu) collapses into one ⋯
  options popover; desktop unchanged so the trust-feature toggle stays visible where
  there's room · gate: build pending; **visual gate** defined for this pass (Sean's
  device + orchestrator eyes on the phone screenshots before merge).
  *App notes: (1) "the system needs to be visually aware" (Sean) is now a first-class
  runner requirement: a vision lane that judges renders against absolute criteria —
  starting manual (human device check + a vision-capable model reviewing harness
  captures), automatable later. (2) Responsive breakage is a defect class the
  single-viewport matrix structurally cannot see — matrices need a width axis. (3) The
  afternoon audit sitting now covers four items: #81, #82, the stark-cut/close hotfix,
  and mobile-nav.*
