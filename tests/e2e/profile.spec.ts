import { expect, test, type Page } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

// This focused regression flow intentionally keeps a video and trace on every run.
test.use({ video: 'on', trace: 'on' });

const items = ['Flower crown', 'Heart sunglasses', 'Hair bow', 'Sparkle earrings', 'Tiara', 'Butterflies', 'Cherry-blossom petals', 'Hearts float'];

async function assertFrame(page: Page) {
  const frame = await page.evaluate(() => {
    const stage = document.querySelector('[data-testid="portrait-stage"]')!;
    const face = document.querySelector('[data-testid="face-safe-zone"]')!.getBoundingClientRect();
    const stageBox = stage.getBoundingClientRect();
    const bow = stage.querySelector('[data-testid="item-2"] [data-face-avoid]');
    let anchorOnHair = true;
    if (bow) {
      const image = stage.querySelector('[data-active="true"] img') as HTMLImageElement;
      const imageBox = image.getBoundingClientRect();
      const bowBox = bow.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0);
      const x = Math.floor((bowBox.left + bowBox.width / 2 - imageBox.left) / imageBox.width * image.naturalWidth);
      const y = Math.floor((bowBox.top + bowBox.height / 2 - imageBox.top) / imageBox.height * image.naturalHeight);
      anchorOnHair = context.getImageData(x, y, 1, 1).data[3] > 240;
    }
    return {
      anchorOnHair,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      faceInFrame: face.left >= Math.max(stageBox.left, 0) && face.top >= stageBox.top && face.right <= Math.min(stageBox.right, innerWidth) && face.bottom <= stageBox.bottom,
      uncovered: [...document.querySelectorAll('[data-face-avoid]')].every(el => {
        const r = el.getBoundingClientRect();
        return r.right <= face.left || r.left >= face.right || r.bottom <= face.top || r.top >= face.bottom;
      }),
    };
  });
  expect(frame).toEqual({ anchorOnHair: true, overflow: false, faceInFrame: true, uncovered: true });
}

async function caption(page: Page, text: string) {
  await page.evaluate(text => {
    let band = document.getElementById('flow-caption');
    if (!band) {
      band = document.createElement('div');
      band.id = 'flow-caption';
      // OFL Inter, local only. Captions are private review artifacts, not page UI.
      const style = document.createElement('style');
      style.textContent = '@font-face{font-family:ReviewInter;src:url(/fonts/inter.ttf)}';
      document.head.append(style);
      Object.assign(band.style, { position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '99999', padding: '12px 16px', background: '#171512', color: '#fffaf1', font: '500 14px/1.4 ReviewInter, sans-serif', pointerEvents: 'none' });
      document.body.append(band);
    }
    band.textContent = text;
  }, text);
}

async function capture(page: Page, path: string) {
  await page.screenshot({ path, fullPage: true, animations: 'disabled', style: '#flow-caption { visibility: hidden !important; }' });
}

test('portrait modes and every inventory item remain usable and face-safe', async ({ page, browserName }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const failed: string[] = [];
  page.on('response', response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  const started = Date.now();
  const captions: string[] = [];
  async function step(text: string) {
    captions.push(`${((Date.now() - started) / 1000).toFixed(1)}s — ${text}`);
    if (process.env.CAPTION_IN_BROWSER === '1') await caption(page, text);
  }
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'PORTFOLIO', exact: true })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await step('What this shows: Abey’s portrait playground — look for both styles, eight items and a clear face.');
  await page.waitForTimeout(1800);
  for (const mode of ['Normal', 'Cartoon']) {
    await step(`${mode} portrait: switch styles without changing the page layout.`);
    await page.getByRole('button', { name: mode, exact: true }).click();
    await expect(page.getByRole('button', { name: mode, exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId(`portrait-${mode.toLowerCase()}`)).toBeVisible();
    await page.waitForTimeout(250);
    await expect(page.getByTestId(`portrait-${mode.toLowerCase()}`)).toHaveCSS('opacity', '1');
    await assertFrame(page);
    await capture(page, testInfo.outputPath(`${mode.toLowerCase()}-default.png`));
    await page.getByRole('button', { name: 'Open inventory', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();
    // No modal overlay, dimming or inert page. The portrait stays bright.
    expect(await page.locator('[data-testid="portrait-stage"]').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
    await expect(page.locator('[aria-modal="true"], [data-testid="inventory-backdrop"]')).toHaveCount(0);
    await capture(page, testInfo.outputPath(`${mode.toLowerCase()}-inventory.png`));
    for (const [index, item] of items.entries()) {
      await step(`${mode}: equip ${item.toLowerCase()}, then put it away. The face stays clear.`);
      const button = page.getByRole('button', { name: item, exact: true });
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByTestId(`item-${index}`)).toBeVisible();
      await page.waitForTimeout(600);
      await assertFrame(page);
      await capture(page, testInfo.outputPath(`${mode.toLowerCase()}-${index}-on.png`));
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'false');
      await expect(page.getByTestId(`item-${index}`)).toHaveCount(0);
      await page.waitForTimeout(250);
      await capture(page, testInfo.outputPath(`${mode.toLowerCase()}-${index}-off.png`));
    }
    // Verify combinations as well as the isolated states, and state persistence.
    for (const item of items) await page.getByRole('button', { name: item, exact: true }).click();
    await assertFrame(page);
    await capture(page, testInfo.outputPath(`${mode.toLowerCase()}-all.png`));
    await page.getByRole('button', { name: 'Clear items', exact: true }).click();
    await expect(page.locator('[data-equipped="true"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Flower crown', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).not.toBeVisible();
  }
  await step('Keyboard check: open with Enter, close with Escape, and return focus to the bag.');
  const bag = page.getByRole('button', { name: 'Open inventory', exact: true });
  await bag.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Close inventory', exact: true })).toBeFocused();
  // macOS WebKit follows the system's default button-navigation preference.
  // Option+Tab is Safari's native all-controls shortcut; do not change global preferences.
  // https://github.com/microsoft/playwright/issues/41808
  await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('button', { name: 'Flower crown', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(bag).toBeFocused();
  await step('Reduced motion and small-screen check: the same controls, without floating effects.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await bag.click();
  await page.getByRole('button', { name: 'Hearts float', exact: true }).click();
  expect(await page.getByTestId('item-7').locator('[data-float]').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.keyboard.press('Escape');
  await assertFrame(page);
  await bag.click();
  await page.getByRole('button', { name: 'Close inventory', exact: true }).click();
  await expect(bag).toBeFocused();
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 252, 245)');
  await capture(page, testInfo.outputPath('dark-system.png'));
  await step('Scroll tour: approved career headline, unfilled personal details and five TODO cards.');
  await page.getByRole('heading', { name: 'I help teams turn messy data into smart decisions.' }).scrollIntoViewIfNeeded();
  await expect(page.getByTestId('intro')).toHaveText('I help teams turn messy data into smart decisions.');
  await expect(page.getByTestId('personal-notes')).toContainText('TODO');
  await page.getByRole('heading', { name: 'FAVOURITE THINGS' }).scrollIntoViewIfNeeded();
  await expect(page.getByTestId('favourite-card')).toHaveCount(5);
  for (const card of await page.getByTestId('favourite-card').all()) await expect(card).toContainText('TODO');
  await capture(page, testInfo.outputPath('full-page.png'));
  // Worst-case copy must wrap rather than widen the layout.
  await page.getByTestId('intro').evaluate(el => { el.textContent = 'TODO ' + 'Averylongunbrokenword'.repeat(15) + ' 你好 🌸'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await page.getByRole('link', { name: 'Back to top' }).click();
  await expect(page.getByRole('heading', { name: 'PORTFOLIO', exact: true })).toBeInViewport();
  await step('Result: both portraits, all eight items, keyboard and responsive checks passed.');
  await page.waitForTimeout(2000);
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
  const captionFile = testInfo.outputPath('video.webm.md');
  await writeFile(captionFile, captions.join('\n') + '\n');
  await testInfo.attach('captions', { path: captionFile, contentType: 'text/markdown' });
});
