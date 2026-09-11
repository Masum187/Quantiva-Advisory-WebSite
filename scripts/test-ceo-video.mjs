import { chromium } from 'playwright';

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/de/about', { waitUntil: 'networkidle', timeout: 60000 });

  // Scroll to CEO video section
  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  // Click play button
  const playBtn = page.locator('button:has-text("Video abspielen"), section:has(video) button').first();
  await playBtn.click({ timeout: 10000 }).catch(() => video.click());
  await page.waitForTimeout(3000);

  const state = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? {
      src: v.currentSrc,
      readyState: v.readyState,
      paused: v.paused,
      currentTime: v.currentTime,
      duration: v.duration,
      videoWidth: v.videoWidth,
      error: v.error ? v.error.code : null,
    } : null;
  });
  console.log('VIDEO STATE:', JSON.stringify(state, null, 2));

  await page.screenshot({ path: '/tmp/ceo-video-playing.png' });
  await browser.close();

  if (!state || state.error || state.videoWidth === 0) {
    console.error('FAIL');
    process.exit(1);
  }
  console.log('OK');
};
run();
