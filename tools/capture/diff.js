'use strict';

// Pixel diff for before/after screenshot pairs.
// Usage: node diff.js before.png after.png [diff-out.png]
// Prints "<diffPixels>/<totalPixels> (<pct>%)" to stdout; exit code is
// always 0 (this is a reporting tool, not a gate) — read the percentage.

const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

function main() {
  const [, , beforePath, afterPath, diffOutPath] = process.argv;
  if (!beforePath || !afterPath) {
    console.error('Usage: node diff.js before.png after.png [diff-out.png]');
    process.exit(2);
  }

  const before = PNG.sync.read(fs.readFileSync(beforePath));
  const after = PNG.sync.read(fs.readFileSync(afterPath));

  if (before.width !== after.width || before.height !== after.height) {
    console.log(
      `DIMENSION MISMATCH: ${path.basename(beforePath)} is ${before.width}x${before.height}, ` +
      `${path.basename(afterPath)} is ${after.width}x${after.height}`
    );
    process.exit(0);
  }

  const { width, height } = before;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(before.data, after.data, diff.data, width, height, { threshold: 0.1 });
  const totalPixels = width * height;
  const pct = ((diffPixels / totalPixels) * 100).toFixed(4);

  console.log(`${path.basename(beforePath)} vs ${path.basename(afterPath)}: ${diffPixels}/${totalPixels} px (${pct}%)`);

  if (diffOutPath) {
    fs.mkdirSync(path.dirname(diffOutPath), { recursive: true });
    fs.writeFileSync(diffOutPath, PNG.sync.write(diff));
  }
}

main();
