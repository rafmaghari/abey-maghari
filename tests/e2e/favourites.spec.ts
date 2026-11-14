import { expect, test } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

test.use({ video: 'on', trace: 'on' });

test('four favourite things appear in order and fit the viewport', async ({ page }, testInfo) => {
  const start = Date.now();
  const captions: string[] = [];
  async function caption(text: string) {
    captions.push(`${((Date.now() - start) / 1000).toFixed(1)}s — ${text}`);
    if (process.env.CAPTION_IN_BROWSER !== '1') return;
    await page.evaluate(value => {
      let band = document.getElementById('flow-caption');
      if (!band) {
        const style = document.createElement('style');
        style.textContent = '@font-face{font-family:ReviewInter;src:url(/fonts/inter.ttf)}';
        document.head.append(style);
        band = document.createElement('div');
        band.id = 'flow-caption';
        Object.assign(band.style, { position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '99999', padding: '12px 16px', background: '#171512', color: '#fffaf1', font: '500 14px/1.4 ReviewInter, sans-serif', pointerEvents: 'none' });
        document.body.append(band);
      }
      band.textContent = value;
    }, text);
  }
  await page.goto(process.env.FAVOURITES_TEST_URL ?? '/');
  await caption('What this shows: Favourite things — four illustrated interests in order.');
  await page.waitForTimeout(1200);
  const section = page.getByRole('region', { name: 'FAVOURITE THINGS' });
  await section.scrollIntoViewIfNeeded();
  await caption('The cards show guitar, motorcycle, travel and biking.');
  const cards = section.getByTestId('favourite-card');
  await expect(cards).toHaveCount(4);
  await expect(cards.locator('h3')).toHaveText(['Guitar', 'Motorcycle', 'Travel', 'Biking']);
  await expect(section).not.toContainText('TODO');
  await expect(cards.locator('svg')).toHaveCount(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (process.env.FAVOURITES_SCREENSHOT_DIR) {
    await section.screenshot({ path: `${process.env.FAVOURITES_SCREENSHOT_DIR}/favourites-${page.viewportSize()!.width}.png`, animations: 'disabled', style: '#flow-caption { visibility: hidden !important; }' });
  }
  await caption('Result: four cards, no placeholders, and no horizontal overflow.');
  await page.waitForTimeout(1200);
  await writeFile(testInfo.outputPath('video.webm.md'), captions.join('\n') + '\n');
});
