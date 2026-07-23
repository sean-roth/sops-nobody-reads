# CHANGE NOTE — LOTO demo-cut menu (DEMO-CUT-MENU, 2026-07-23)

Set the course menu to the demo cut: **Module 1 live; Modules 2–3 present but
greyed, non-navigable, "Coming soon,"** and bring the menu copy onto the outreach
voice. Menu only.

Branch: `loto-demo-cut-menu`, off `main` (`2741eda`, post-NL2BR merge).
Scope held to `courses/loto/builds/index.html` (the self-contained menu — its
styles live in its own `<style>` block, light-only, no dark toggle). No player,
no chrome, no data.

---

## Copy changes (voice)

| Where | Before | After | Note |
|---|---|---|---|
| `.course-label` | Industrial Safety **Training** | **Industrial Safety** | Flagged decision — Sean chose "Industrial Safety" over the alternative "Safety Onboarding". |
| `.course-description` (1st sentence) | Essential **training** for controlling hazardous energy… | Essential **onboarding** for controlling hazardous energy… | Straight swap. |
| `.contact-note` | …how you **train** now and where the gaps are. | *(unchanged)* | Flagged judgment call — "train" here describes the customer's *own* current process, not our offering. Sean chose to **keep "train"**. |
| `.course-meta` | 3 modules · Self-paced · Based on OSHA 29 CFR 1910.147 | 3 modules · **Module 1 open now** · Self-paced · Based on OSHA 29 CFR 1910.147 | Builder-proposed; signals the demo state. |

**Deliberately untouched:** the contact section heading + subtext ("This one was
built from a public standard." / "Yours would be built from your procedures…") —
already the pitch voice. The regulation name (29 CFR 1910.147) stays everywhere —
voice rules govern our copy, not the source's name.

---

## Coming-soon treatment (M2 + M3)

Each row converted from a link to a disabled div — a menu *state*, reversible with
one class + one tag swap per row:

```html
<!-- before -->                                    <!-- after -->
<a class="module-row" href="module-02/index.html">  <div class="module-row coming-soon" aria-disabled="true">
  …                                                   …
  <span class="row-duration">~15 min</span>           <span class="row-duration">Coming soon</span>
  …                                                   …
</a>                                                </div>
```

CSS added (scoped, 2 rules):

```css
.coming-soon { opacity: 0.45; pointer-events: none; }
.coming-soon .row-arrow { visibility: hidden; }
```

- `pointer-events: none` removes the click path **and** every hover affordance
  (transform, border, arrow slide) in one stroke — no separate hover overrides.
- The arrow is hidden with `visibility: hidden`, **not** `display: none`, so its
  grid column stays reserved and M2/M3 line up pixel-for-pixel with the live row
  (no layout shift — confirmed in the desktop screenshots).
- Part labels kept; only the duration becomes "Coming soon".

To restore a module: swap the `<div …>`/`</div>` back to `<a href=…>`/`</a>`,
drop `coming-soon`, restore the duration. One row at a time.

---

## Verification (audit checklist V1–V4)

| ID | Check | Result |
|---|---|---|
| **V1** | Diff confined to `builds/index.html` (+ this change note) | **PASS** — screenshots in a separate, strippable commit |
| **V2** | Banned-word grep of rendered copy `\b(training\|compliance\|platform\|solution\|LMS\|SCORM\|AI)\b` (case-insensitive; reg name exempt) | **PASS** — 0 hits. `training` 2 → 0. `train` (kept, customer's world) is a different token, not in the banned set. |
| **V3** | M1 navigable; M2/M3 no nav path; focus order sane; `aria-disabled` present | **PASS** — M1 `<a href>`; M2/M3 `<div aria-disabled="true">`, no href, `tabIndex −1` (not focusable). Tab order = M1, Book-the-call, email, brand only. |
| **V4** | 390px + desktop, no layout break; live `/demo` spot-check | **PASS (local)** — phone 390px + desktop 1440px captured, greyed rows align with the live row, no break. Live `/demo` device check is post-merge (Sean). |

Captured with a headless-Chromium harness (transitions disabled, `fonts.ready`
awaited). BEFORE from `main`; AFTER from this branch.

---

## Handback

- `courses/loto/builds/index.html` — the menu changes.
- `courses/loto/CHANGE-NOTE-demo-cut-menu.md` — this note.
- `courses/loto/screenshots/demo-cut-menu/` — `menu-{phone|desktop}-{before|after}.png`
  (4 PNGs). **Branch-only; strip before squash-merge** (separate commit).
- After merge: verify live `/demo` on a phone — Module 1 opens; Modules 2–3 don't.
