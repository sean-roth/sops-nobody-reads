# HOUSEKEEPING — 2026-07-24 (paste to a builder session; ~10 minutes, mechanical)

Remediation for the AUDIT-2026-07-24-sitting FAILs (V1 / B1 / R1 — all one class: evidence on `main`) plus the cache-integrity fix. Direct to `main`; every step verifiable by read. **Do not touch the `evidence/demo-polish` branch — that is the new convention working.**

## 1. Prune merged gate artifacts from `main`'s tree

```
git rm -r courses/loto/screenshots/chrome-consolidation \
          courses/loto/screenshots/mobile-nav \
          courses/loto/screenshots/mobile-readability
git commit -m "housekeeping: prune merged gate artifacts (remediates sitting V1/B1/R1)"
```

History retains the blobs; the audit reports and PR refs remain the durable record. This converts the sitting's three FAILs to remediated.

## 2. Version-stamp the chrome assets (cache integrity)

In each of `builds/module-01/index.html`, `module-02`, `module-03`: append `?v=2026-07-24` to the two chrome CSS `<link>` hrefs and the `player.js` script `src`. Commit separately: `"housekeeping: version-stamp chrome assets"`. **Standing rule until the runner automates it at publish: bump the stamp in the same commit as any `chrome/` change.** This ends the deployed-but-cached ambiguity that cost us three false alarms this week.

## 3. Delete the audited branches

```
git push origin --delete loto-nl2br-fix loto-demo-cut-menu loto-mobile-nav
```

(Plus the readability branch if it still exists — check `git branch -r`.) Evidence stays reachable via `refs/pull/<n>/head`; the audits are closed and their reports cite what they verified.

## 4. Verify by read, then report

Confirm: the three `screenshots/` paths 404 on raw `main`; each shell carries `?v=`; the branch list is clean. Report the commit SHAs for steps 1–2.
