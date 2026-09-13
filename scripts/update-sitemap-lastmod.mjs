#!/usr/bin/env node
/**
 * DEPRECATED — do not write public/sitemap.xml.
 *
 * Lastmod is handled by `app/sitemap.ts` (Next.js Metadata Route).
 * Writing a static file in public/ would override the complete sitemap.
 */
console.log(
  '⚠️  scripts/update-sitemap-lastmod.mjs is deprecated. Sitemap is served by app/sitemap.ts.',
);
process.exit(0);
