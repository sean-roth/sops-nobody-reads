'use strict';

// Generic capture primitives — no LOTO-specific knowledge here.
// (LOTO player navigation helpers live in loto-player.js.)

const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

// Serves rootDir over plain HTTP on an OS-assigned port. file:// works for
// this player too, but a real server avoids file:// fetch/CORS edge cases
// and matches how the demo is actually delivered (GitHub Pages).
function serveDir(rootDir) {
  const root = path.resolve(rootDir);
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const filePath = path.join(root, urlPath === '/' ? '/index.html' : urlPath);
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found: ' + urlPath);
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

// Same determinism recipe the chrome-consolidation matrix used (per its
// change note): fonts ready, images decoded, transitions killed, two-frame
// settle. Transitions are killed via the *existing* prefers-reduced-motion
// rule in chrome.css (page.emulateMedia), not injected override CSS.
async function newDeterministicPage(browser, { width, height }) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (err) => errors.push(err));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(new Error(msg.text())); });
  page.errors = errors;
  return page;
}

async function settle(page) {
  await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
  await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete));
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
}

async function shoot(page, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath });
}

module.exports = { serveDir, newDeterministicPage, settle, shoot };
