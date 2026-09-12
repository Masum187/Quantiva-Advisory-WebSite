import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let fail = 0;

for (const lang of ['de', 'en']) {
  await page.goto(`http://localhost:3000/${lang}/services/microservices`, { waitUntil: 'networkidle', timeout: 45000 });
  // Zur Whitepaper-Sektion scrollen
  const heading = page.locator('h2', { hasText: /Studien & Whitepaper|Studies & Whitepapers/ }).first();
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const cards = await page.locator('img[src*="/assets/whitepapers/integration/"]').count();
  // Erste Karte anklicken -> Modal mit Formular muss erscheinen
  await page.locator('img[src*="/assets/whitepapers/integration/"]').first().click({ force: true }).catch(() => {});
  // WhitepaperCard hat einen Button/Karten-Klick — generisch: klicke Karte
  const cardBtn = page.locator('button', { hasText: /Whitepaper|Download|herunterladen/i }).first();
  if (await cardBtn.count()) await cardBtn.click().catch(() => {});
  await page.waitForTimeout(800);
  const hasForm = await page.locator('input[name="email"], input[type="email"]').count();
  await page.screenshot({ path: `/tmp/wp-integration-${lang}.png` });
  const ok = cards === 6 && hasForm > 0;
  console.log(`${ok ? 'OK  ' : 'FAIL'} /${lang}/services/microservices — cards=${cards} form=${hasForm}`);
  if (!ok) fail++;
  await page.keyboard.press('Escape').catch(() => {});
}
await browser.close();
process.exit(fail ? 1 : 0);
