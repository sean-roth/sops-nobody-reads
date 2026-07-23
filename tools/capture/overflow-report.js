'use strict';

// Combines overflow-audit.js's before/after JSON into a markdown report.
// Usage: node overflow-report.js before.json after.json > REPORT.md

const fs = require('fs');

const VIEWPORT_ORDER = ['390x844', '360x800', '390x704-chrome', '360x660-chrome'];
const MODES = ['light', 'dark'];

function cellsFor(rows, module, waypoint) {
  return VIEWPORT_ORDER.flatMap((viewport) =>
    MODES.map((mode) => rows.find((r) => r.module === module && r.waypoint === waypoint && r.viewport === viewport && r.mode === mode))
  );
}

function symbolBefore(row) {
  if (!row) return '?';
  return row.clipped ? (row.clippedH ? 'H-CLIP' : 'V-clip') : 'ok';
}

function symbolAfter(row) {
  if (!row) return '?';
  if (!row.clipped) return 'ok';
  if (row.clippedH) return '**H-CLIP**';
  return row.scrollWorks ? 'scrolls' : '**STUCK**';
}

function moduleTable(beforeRows, afterRows, module, waypoints) {
  const header = `| Waypoint | ${VIEWPORT_ORDER.flatMap((v) => MODES.map((m) => `${v}/${m}`)).join(' | ')} |`;
  const sep = `|---|${VIEWPORT_ORDER.flatMap(() => MODES.map(() => '---')).join('|')}|`;
  const lines = [header, sep];
  for (const wp of waypoints) {
    const before = cellsFor(beforeRows, module, wp).map(symbolBefore);
    const after = cellsFor(afterRows, module, wp).map(symbolAfter);
    const cells = before.map((b, i) => `${b}→${after[i]}`);
    lines.push(`| ${wp} | ${cells.join(' | ')} |`);
  }
  return lines.join('\n');
}

function main() {
  const [, , beforePath, afterPath] = process.argv;
  if (!beforePath || !afterPath) {
    console.error('Usage: node overflow-report.js before.json after.json');
    process.exit(2);
  }
  const before = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = JSON.parse(fs.readFileSync(afterPath, 'utf8'));

  const modules = [...new Set(before.map((r) => r.module))];
  const out = [];
  out.push('# Overflow audit — before -> after');
  out.push('');
  out.push(`Generated from \`${beforePath}\` and \`${afterPath}\`. Cell format: before→after.`);
  out.push('`ok` = fits. `V-clip`/`**STUCK**` = vertical overflow, before/after (STUCK = backstop did not reach the bottom — a real failure).');
  out.push('`scrolls` = vertical overflow but the backstop makes it fully reachable (expected/fine). `H-CLIP` = horizontal overflow (the backstop cannot fix this; it must not appear after the fix).');
  out.push('');
  out.push('**Caveat:** the "before" column\'s scroll-reachability isn\'t meaningful — `overflow: hidden` still lets JS set `scrollTop` (it just gives no user-facing scroll affordance), so "before" is reported as clipped/not-clipped only, never as stuck. Only the "after" column\'s scrolls/STUCK distinction is a real signal.');
  out.push('');

  for (const module of modules) {
    const waypoints = [...new Set(before.filter((r) => r.module === module).map((r) => r.waypoint))];
    // natural sort: slide-2 before slide-10
    waypoints.sort((a, b) => {
      const na = a.match(/\d+/), nb = b.match(/\d+/);
      if (na && nb && a.replace(na[0], '') === b.replace(nb[0], '')) return Number(na[0]) - Number(nb[0]);
      return a.localeCompare(b);
    });
    out.push(`## ${module}`);
    out.push('');
    out.push(moduleTable(before, after, module, waypoints));
    out.push('');
  }

  const clippedBefore = before.filter((r) => r.clipped).length;
  const clippedAfter = after.filter((r) => r.clipped).length;
  const stuckAfter = after.filter((r) => r.clipped && !r.scrollWorks).length;
  out.push('## Summary');
  out.push('');
  out.push(`- Total checks: ${before.length}`);
  out.push(`- Clipped before: ${clippedBefore}`);
  out.push(`- Clipped after: ${clippedAfter} (${stuckAfter} stuck-and-unscrollable)`);

  console.log(out.join('\n'));
}

main();
