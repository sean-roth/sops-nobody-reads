# DEMO-CUT-MENU — builder brief (2026-07-23, morning)

STATUS: READY FOR BUILD. Branch off `main` **after NL2BR-PASS merges** (sequential, never stacked), one PR. Cold audit: same-day, post-merge. Merge = publish (live `/demo` serves `main`).

## Objective

Set the course menu to the demo cut: **Module 1 live; Modules 2–3 present but greyed, non-navigable, labeled "Coming soon."** Bring the menu's copy fully onto the outreach voice (`phonebooth/_agent/README.md`). Menu only — no player, no chrome, no data.

## Scope

`courses/loto/builds/index.html` only (the menu is self-contained: its styles live in its own `<style>` block, separate from `chrome/` by design — it matches the marketing site, light mode only, no dark toggle).

## Copy findings to fix (voice audit, 2026-07-22 — verified against the live file)

| Where | Current | Replace with |
|---|---|---|
| `.course-label` | "Industrial Safety Training" | "Industrial Safety" (Sean may prefer "Safety Onboarding" — flag in change note, default to the first) |
| `.course-description`, first sentence | "Essential training for controlling hazardous energy…" | "Essential onboarding for controlling hazardous energy…" |
| `.contact-note` | "…how you train now and where the gaps are." | "…how you onboard now and where the gaps are." — judgment call: "train" here describes *their* world; default to the swap, flag for Sean's eyeball |

Everything else is verified clean — no "compliance," "platform," "solution," "LMS," "SCORM," or "AI" anywhere, and the contact section ("This one was built from a public standard. Yours would be built from your procedures.") is already the pitch voice: **do not touch it.** The regulation's own name (29 CFR 1910.147) stays as-is everywhere — voice rules govern our copy, not the source's.

## Coming-soon treatment (M2 + M3 rows)

- Convert each from `<a class="module-row" href=…>` to `<div class="module-row coming-soon" aria-disabled="true">` — no href, no click path.
- Add one class: `.coming-soon { opacity: .45; pointer-events: none; }`; suppress the hover transform and arrow for these rows. No layout shift vs. the live row.
- In `.row-side`, replace the duration with "Coming soon" (keep the Part label).
- `.course-meta`: propose "3 modules · Module 1 open now · Self-paced · Based on OSHA 29 CFR 1910.147" — builder proposes, Sean eyeballs in the change note.
- Reversal must stay one class + one tag swap per row. This is a menu *state*, not an architecture.

## Hard constraints

- Diff confined to the menu file.
- Phone check: 390px-wide screenshot (menu is light-only by design), plus desktop width. Branch-only screenshots; strip before squash-merge.
- After merge: verify live `/demo` on an actual phone — M1 opens, M2/M3 don't.

## Handback

- `courses/loto/CHANGE-NOTE-demo-cut-menu.md` — exact copy before/after table, the coming-soon markup, screenshots.

## Audit checklist (cold, post-merge)

- **V1** — diff confined to `builds/index.html` + change note.
- **V2** — banned-word grep of rendered menu copy (training|compliance|platform|solution|LMS|SCORM|AI, case-insensitive): zero hits in our copy; regulation name exempt.
- **V3** — M2/M3 have no navigation path (no href, no click handler); M1 opens; keyboard focus order sane; `aria-disabled` present.
- **V4** — 390px and desktop screenshots: no layout break; live `/demo` spot-check performed.
