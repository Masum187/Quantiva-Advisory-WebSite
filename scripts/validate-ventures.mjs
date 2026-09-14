/**
 * Validates the current venture source (app/lib/data/projects.ts)
 * used by the public /cases pages — complementary to validate-cases.mjs
 * which still checks the legacy cases.json catalogue.
 */
import fs from 'fs';
import path from 'path';
import process from 'process';

const STRICT = process.argv.includes('--strict');
const ROOT = process.cwd();
const PROJECTS_PATH = path.join(ROOT, 'app', 'lib', 'data', 'projects.ts');
const PUBLIC_DIR = path.join(ROOT, 'public');

const source = fs.readFileSync(PROJECTS_PATH, 'utf8');

const slugMatches = [...source.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);
const nameMatches = [...source.matchAll(/name:\s*'([^']+)'/g)].map((m) => m[1]);
const logoMatches = [...source.matchAll(/logo:\s*'([^']+)'/g)].map((m) => m[1]);

const errors = [];
const warnings = [];

if (slugMatches.length === 0) {
  errors.push('No venture slugs found in projects.ts');
}

const seen = new Set();
for (const slug of slugMatches) {
  if (seen.has(slug)) errors.push(`Duplicate venture slug: ${slug}`);
  seen.add(slug);
}

if (nameMatches.length < slugMatches.length) {
  warnings.push(`Fewer names (${nameMatches.length}) than slugs (${slugMatches.length})`);
}

for (const logo of logoMatches) {
  if (!logo.startsWith('/')) continue;
  const filePath = path.join(PUBLIC_DIR, logo);
  if (!fs.existsSync(filePath)) {
    const message = `Missing logo file: ${logo}`;
    if (STRICT) errors.push(message);
    else warnings.push(message);
  }
}

if (warnings.length) {
  console.warn('Venture validation warnings:');
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (errors.length) {
  console.error('Venture validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`✓ ${slugMatches.length} ventures in projects.ts`);
