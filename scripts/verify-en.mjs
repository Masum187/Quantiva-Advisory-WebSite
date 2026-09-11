import { chromium } from 'playwright';

const PAGES = [
  '/en/cases',
  '/en/cases/solutiongate',
  '/en/cases/procuvera',
  '/en/cases/nuvora',
  '/en/about',
  '/en/services/sap',
  '/en/services/ai',
  '/en/services/cyber-security',
  '/en/services/digital-strategy',
  '/en/services/microservices',
  '/en/services/new-work',
  '/en/services/test-automation',
  '/en/team',
  '/en/strategy-consulting',
];

// Wörter, die auf vergessenes Deutsch hindeuten (keine Markennamen/False Positives)
const GERMAN = /\b(Nächstes|Projekte|Willkommen|Beratung|Unternehmen|Lösungen|Übersicht|Erfahren|Mehr erfahren|Kontakt aufnehmen|Jetzt|Woran|Gründerin|folgt in Kürze|ausfüllen|herunterladen|Anfrage|Vorteile|Leistungen)\b|[äöüß]/;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let fail = 0;

for (const path of PAGES) {
  try {
    const res = await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle', timeout: 45000 });
    const status = res?.status();
    await page.waitForTimeout(800);
    const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
    const text = await page.evaluate(() => document.body.innerText);
    const german = text.match(GERMAN);
    const name = path.replace(/\//g, '_');
    await page.screenshot({ path: `/tmp/en-verify${name}.png` });
    const issues = [];
    if (status !== 200) issues.push(`status=${status}`);
    if (hScroll) issues.push('H-SCROLL');
    if (german) issues.push(`GERMAN:"${german[0]}" ctx:"${text.substring(Math.max(0, german.index - 40), german.index + 40).replace(/\n/g, ' ')}"`);
    console.log(`${issues.length ? 'FAIL' : 'OK  '} ${path}${issues.length ? ' — ' + issues.join(' | ') : ''}`);
    if (issues.length) fail++;
  } catch (e) {
    console.log(`ERR  ${path}: ${e.message.split('\n')[0]}`);
    fail++;
  }
}
await browser.close();
process.exit(fail ? 1 : 0);
