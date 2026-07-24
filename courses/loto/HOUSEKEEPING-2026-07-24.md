# HOUSEKEEPING — 2026-07-24 (paste to a builder session; ~10 minutes, mechanical)

Remediation for the AUDIT-2026-07-24-sitting FAILs (V1 / B1 / R1 — all one class: evidence on `main`) plus the cache-integrity fix. Direct to `main`; every step verifiable by read. **Do not touch the `evidence/demo-polish` branch — that is the new convention working.**

## 1. Prune merged gate artifacts from `main`'s tree

```
git rm -r courses/loto/screenshots/demo-cut-menu \
          courses/loto/screenshots/mobile-nav \
          courses/loto/screenshots/mobile-readability
git commit -m "housekeeping: prune sitting evidence (remediates V1/B1/R1)"
```

History retains the blobs; the audit reports and PR refs remain the durable record. This converts the sitting's three FAILs to remediated. 54 files (4 + 24 + 26), matching T24's orchestrator ruling.

**Correction (see Executed, below):** this step originally named `screenshots/chrome-consolidation` here instead of `screenshots/demo-cut-menu` — chrome-consolidation is a real but *older*, out-of-sitting pending item (WORKFLOW-TRACE.md open items, 2026-07-22), not the V1 target. Run as a separate step:

```
git rm -r courses/loto/screenshots/chrome-consolidation
git commit -m "housekeeping: prune chrome-consolidation evidence"
```

132 files. Closes the 2026-07-22 open item; unrelated to V1/B1/R1.

## 2. Version-stamp the chrome assets (cache integrity)

In each of `builds/module-01/index.html`, `module-02`, `module-03`: append `?v=2026-07-24` to the two chrome CSS `<link>` hrefs and the `player.js` script `src`. Commit separately: `"housekeeping: version-stamp chrome assets"`. **Standing rule until the runner automates it at publish: bump the stamp in the same commit as any `chrome/` change.** This ends the deployed-but-cached ambiguity that cost us three false alarms this week.

## 3. Delete the audited branches

```
git push origin --delete loto-nl2br-fix loto-demo-cut-menu loto-mobile-nav
```

(Plus the readability branch if it still exists — check `git branch -r`.) Evidence stays reachable via `refs/pull/<n>/head`; the audits are closed and their reports cite what they verified.

## 4. Verify by read, then report

Confirm: the four `screenshots/` paths 404 on raw `main`; each shell carries `?v=`; the branch list is clean. Report the commit SHAs for steps 1–2.

## Executed — 2026-07-24 (Claude, ad hoc session, at Sean's direction)

Run via clone + `gh`/`git`, not pasted into a builder session as drafted. Before running, cross-checked step 1's file list against `AUDIT-2026-07-24-sitting.md`'s own evidence accounting ("main carries 24 PNGs under `screenshots/mobile-nav/`, 4 under `screenshots/demo-cut-menu/`, and 26 files under `screenshots/mobile-readability/`") and T24's ruling ("prune the 54 evidence files") — neither mentions `chrome-consolidation`, and 4+24+26=54 exactly, so the drafted command (which swapped in `chrome-consolidation` for `demo-cut-menu`) would have left V1 unremediated while deleting an unrelated 132-file directory. Ran both prunes as separate commits instead (see step 1, above). Logged as `docs/BUILD-LESSONS.md` L2 and `docs/app/TRACE-ADDENDUM-2026-07-24-D.md` T25.

Steps 2 and 3 executed as originally drafted, no corrections needed.
