/**
 * Lightweight production smoke checks. Does not send mail.
 * Usage: node scripts/ci-smoke.mjs http://127.0.0.1:3010
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = (process.argv[2] || 'http://127.0.0.1:3010').replace(/\/$/, '');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLOUD = 'https://res.cloudinary.com/dbrisux8i/image/upload';

async function get(pathname, options = {}) {
  const res = await fetch(`${base}${pathname}`, { redirect: 'manual', ...options });
  return res;
}

async function headExternal(url) {
  const res = await fetch(url, { method: 'HEAD' });
  return res;
}

function collectPublicWhitepaperUrls(source) {
  const urls = [];
  const blocks = source.split(/\{\s*slug:/).slice(1);
  for (const block of blocks) {
    if (/\bunavailable:\s*true\b/.test(block)) continue;
    const tpl = block.match(/url:\s*`\$\{CLOUD\}\/([^`]+)`/);
    const abs = block.match(/url:\s*['"](https:[^'"]+)['"]/);
    if (tpl) urls.push(`${CLOUD}/${tpl[1]}`);
    else if (abs) urls.push(abs[1]);
  }
  return urls;
}

const failures = [];

const sitemap = await get('/sitemap.xml');
const sitemapText = await sitemap.text();
if (!sitemap.ok) failures.push(`/sitemap.xml → ${sitemap.status}`);
if (!sitemapText.includes('/de/impressum') || !sitemapText.includes('/en/privacy')) {
  failures.push('sitemap missing legal URLs');
}

for (const path of ['/de/impressum', '/de/datenschutz', '/en/imprint', '/en/privacy']) {
  const res = await get(path);
  if (res.status !== 200) failures.push(`${path} → ${res.status} (expected 200)`);
}

const protectedApis = [
  '/api/ai-test',
  '/api/video-generation',
  '/api/cms/video-generator',
  '/api/cms/upload-video',
];
for (const path of protectedApis) {
  const res = await get(path);
  if (res.status !== 403) {
    failures.push(`${path} GET → ${res.status} (expected 403)`);
  }
  const post = await get(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (post.status !== 403) {
    failures.push(`${path} POST → ${post.status} (expected 403)`);
  }
}

const wpSource = readFileSync(join(root, 'app/lib/data/whitepapers.ts'), 'utf8');
const whitepaperUrls = collectPublicWhitepaperUrls(wpSource);
if (whitepaperUrls.length === 0) {
  failures.push('whitepapers.ts: no public delivery URLs found');
}

for (const url of whitepaperUrls) {
  if (url.includes('/upload/pdf/')) {
    failures.push(`${url} uses a forbidden Cloudinary /pdf/ transform`);
  }
  const paper = await headExternal(url);
  if (paper.status !== 200) {
    failures.push(`whitepaper HEAD ${url} → ${paper.status}`);
  }
}

if (failures.length) {
  console.error('CI smoke failed:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`CI smoke passed (${whitepaperUrls.length} whitepaper URLs checked)`);
