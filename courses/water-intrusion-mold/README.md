# Water Intrusion & Mold Prevention

A **SOPs Nobody Reads** narrative training course teaching apartment maintenance technicians to prevent water-intrusion mold. Segment: **property managers**. Built on public-domain EPA guidance (EPA 402-K-01-001). This course is also the reusable **demo** that sells the customized service, and the **"Maple Court" backlot** — a 1920s courtyard building reused across future courses (fire, electrical).

**Thesis:** *Own the loops, not the leaks.* Mold isn't a cleaning problem that happens to you; it's the predictable output of a moisture system you manage.

## Structure — a descent through the building

| Module | Floor | Register | Spine |
|--------|-------|----------|-------|
| **1 — The Thing That Follows Water** | Floor 3 | Narrative-dominant | The reframe (mold follows moisture) + the bet (control the moisture) |
| **2 — Own the Loops, Not the Leaks** | Floor 2 | Balanced | The four loops: the walk · the tenants · the work orders · the turnovers |
| **3 — Respond in Time** | Foundation | Pedagogy-dominant | Find it · Respond in time · Know the line |

## This folder

```
water-intrusion-mold/
├── README.md            ← you are here
├── BRIEF.md             ← content brief (from the SOP analysis)
├── PRODUCTION-LOG.md    ← current build state, decisions, the image-forward player variant
├── scripts/             ← module-01..03 scripts (01 is a full draft; 02/03 are v1 drafts w/ domain flags)
└── builds/
    ├── module-01.json           ← Module 1 MODULE data (data-of-record)
    ├── IMAGE-PROMPTS.md          ← locked image prompts + shot status
    └── module-01/
        ├── index.html           ← the playable module (open this)
        └── img/                 ← drop images here (see img/MANIFEST.md for names)
```

## View the Module 1 mockup

The player is a single self-contained HTML file. **Two ways to see it:**

1. **Locally** — put your locked images in `builds/module-01/img/` using the exact names in `img/MANIFEST.md`, then open `builds/module-01/index.html` in any browser.
2. **GitHub Pages** — enable Pages for the repo; the module lives at `…/courses/water-intrusion-mold/builds/module-01/`.

Missing images don't break anything — each empty slot shows a labeled placeholder telling you which asset goes there, so the pacing and text are reviewable before every image is in.

**Controls:** ◂ ▸ arrows or the on-screen buttons to move; **N** toggles the narration caption (on by default for review — turn it off to see the clean sound-on experience).

## Status (2026-07-01)

- **Module 1:** images **complete** (9 locked); script drafted; **playable mockup built** (this).
- **Modules 2 & 3:** scripts drafted (v1, domain flags open); not yet decomposed or imaged.
- Next: Sean reviews the assembled M1, feeds it back; then M2/M3 assembly.
