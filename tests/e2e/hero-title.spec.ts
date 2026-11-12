import { expect, test } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

// Keep the focused review flow reproducible, without changing other specs.
test.use({ video: 'on', trace: 'on' });

test('undated hero lettering stays balanced in both portrait styles', async ({ page }, testInfo) => {
  const captions: string[] = [];
  const started = Date.now();
  async function caption(text: string) {
    captions.push(`${((Date.now() - started) / 1000).toFixed(1)}s — ${text}`);
    if (process.env.CAPTION_IN_BROWSER === '1') {
      await page.evaluate(text => {
        let band = document.getElementById('flow-caption');
        if (!band) {
          const style = document.createElement('style');
          style.textContent = '@font-face{font-family:ReviewInter;src:url(/fonts/inter.ttf)}';
          document.head.append(style);
          band = document.createElement('div');
          band.id = 'flow-caption';
          Object.assign(band.style, { position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '99999', padding: '12px 16px', background: '#171512', color: '#fffaf1', font: '500 14px/1.4 ReviewInter,sans-serif', pointerEvents: 'none' });
          document.body.append(band);
        }
        band.textContent = text;
      }, text);
    }
  }
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await caption('What this shows: an undated PORTFOLIO hero — balanced lettering in Normal and Cartoon, on phone and desktop.');
  await page.waitForTimeout(1200);
  const initial = page.viewportSize()!;
  const widths = initial.width >= 1100 ? [initial.width, 599, 600, 768, 1099, 1100, 1920] : [initial.width, 320];
  for (const width of widths) {
    await page.setViewportSize({ width, height: initial.height });
    for (const mode of ['Normal', 'Cartoon']) {
      await caption(`${width}px · ${mode}: only PORTFOLIO, with the final letters lifted into the former ornament space.`);
      await page.getByRole('button', { name: mode, exact: true }).click();
      await expect(page.getByRole('button', { name: mode, exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByTestId(`portrait-${mode.toLowerCase()}`)).toHaveCSS('opacity', '1');
      const heading = page.getByRole('heading', { name: 'PORTFOLIO', exact: true });
      await expect(heading).toHaveText('PORTFOLIO');
      await expect(heading.locator('svg text')).toHaveCount(9);
      const surface = await page.evaluate(() => ({
        title: document.title,
        text: document.querySelector('.profile-hero')!.textContent,
        attributes: [...document.querySelectorAll('meta, [alt], [aria-label]')].flatMap(el => [...el.attributes].map(attribute => attribute.value)),
      }));
      expect(JSON.stringify(surface)).not.toMatch(/['\u2019]2[5]|&apos;2[5]/);
      const geometry = await heading.locator('svg').evaluate(svg => {
        const letters = [...svg.querySelectorAll('text')];
        const box = svg.getBoundingClientRect();
        const first = letters[0].getBoundingClientRect();
        const last = letters[letters.length - 1].getBoundingClientRect();
        return {
          // Relative to the lettering, not a screenshot's absolute offsets.
          rightIsLifted: last.top <= first.top + box.height * .1,
          fillsWidth: last.right >= box.right - box.width * .05,
          noOverflow: document.documentElement.scrollWidth <= innerWidth,
        };
      });
      expect(geometry).toEqual({ rightIsLifted: true, fillsWidth: true, noOverflow: true });
      if (width === initial.width) {
        await page.screenshot({ path: testInfo.outputPath(`${mode.toLowerCase()}.png`), animations: 'disabled', style: '#flow-caption{visibility:hidden!important}' });
        await page.waitForTimeout(700);
      }
    }
  }
  await page.setViewportSize(initial);
  await caption('Result: undated title and accessible text; both modes and responsive title balance passed.');
  await page.waitForTimeout(1500);
  await writeFile(testInfo.outputPath('video.webm.md'), captions.join('\n') + '\n');
});
