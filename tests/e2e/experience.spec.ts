import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

// Reviewed source fixture is independent of the editable site-content module.
const source = readFileSync(path.join(process.cwd(), 'tests/fixtures/abey-experience.md'), 'utf8');
const headline = source.split('## Headline\n')[1].split('\n')[0];
const highlights = source.split('## Highlights\n')[1].split('\n\n')[0].split('\n').map(line => line.slice(2));
const specialties = source.split('## Specialties\n')[1].split('\n')[0].split(' | ');
const employers = [
  'Books To Go Bookkeeping',
  'WeCompete Lenders',
  'Department of Education - Philippines',
  'Department of Social Welfare and Development',
  'RareJob Philippines, Inc.',
];
const groups = source.split('## Experience\n')[1].trim().split(/^### /m).filter(Boolean).map(group => {
  const [heading, ...lines] = group.trim().split('\n');
  return { heading, lines: lines.filter(Boolean) };
});
const notes = source.split('\n').filter(line => line.startsWith('# Notes:') || line.startsWith('# "+8 skills"')).map(line => line.slice(2));

test.use({ video: 'on', trace: 'on' });

test('career source, navigation and five lightweight employer disclosures', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const badResponses: string[] = [];
  page.on('response', response => { if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });
  const start = Date.now();
  const captions: string[] = [];
  const step = (text: string) => captions.push(`${((Date.now() - start) / 1000).toFixed(1)}s — ${text}`);
  const noOverflow = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const screenshot = (name: string) => page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true, animations: 'disabled' });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: headline, exact: true })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  step('What this shows: Abey’s real experience — exact source text, five expandable employers and simple navigation.');
  await page.waitForTimeout(1800);
  await expect(page.getByTestId('intro')).toHaveText(headline);
  await expect(page.getByText('TODO · Add my introduction', { exact: true })).toHaveCount(0);
  await expect(page.getByTestId('highlight')).toHaveText(highlights);
  await expect(page.getByTestId('specialty')).toHaveText(specialties);
  await expect(page.getByTestId('career-entry')).toHaveCount(5);
  await expect(page.locator('[data-testid="career-entry"][open]')).toHaveCount(0);
  await expect(page.getByTestId('professional-content').locator('img, a')).toHaveCount(0);
  await noOverflow();
  await screenshot('overview-collapsed');

  step('Use every navigation link: About, Highlights, Skills, Experience and Favourites.');
  const navigation = page.getByRole('navigation', { name: 'On this page' });
  const targets = [
    ['About', 'about'], ['Highlights', 'highlights'], ['Skills', 'skills'],
    ['Experience', 'experience'], ['Favourites', 'favourites'],
  ];
  for (const [label, id] of targets) {
    await navigation.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await noOverflow();
  }

  for (const [index, group] of groups.entries()) {
    const entry = page.getByTestId('career-entry').nth(index);
    const summary = entry.locator('summary');
    await expect(entry.getByTestId('employer')).toHaveText(employers[index]);
    await expect(entry.getByTestId('employment-context')).toHaveText(group.heading.slice(employers[index].length + 3));
    if (index === 0) {
      await expect(summary).toContainText('Reporting Specialist - Jan 2021 - Mar 2026 - 5 yrs 3 mos');
      await expect(summary).toContainText('Data Specialist - Jan 2021 - Mar 2026 - 5 yrs 3 mos - United States');
    }
    step(`Open ${employers[index]}: review the supplied role details, dates and named skills only.`);
    await summary.click();
    await expect(entry).toHaveJSProperty('open', true);
    await expect(page.locator('[data-testid="career-entry"][open]')).toHaveCount(1);
    for (const line of group.lines) await expect(entry.getByText(line, { exact: true })).toBeVisible();
    await noOverflow();
    await page.waitForTimeout(1000);
    await screenshot(`employer-${index + 1}-open`);
    // Native disclosure keyboard behavior, without custom animated height.
    await summary.focus();
    await page.keyboard.press('Space');
    await expect(entry).toHaveJSProperty('open', false);
    await expect(summary).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(entry).toHaveJSProperty('open', true);
  }

  step('Read the source notes: truncated entries and hidden skill lists are never completed or guessed.');
  const sourceNotes = page.getByTestId('source-notes');
  await sourceNotes.locator('summary').click();
  await expect(sourceNotes).toHaveJSProperty('open', true);
  for (const note of notes) await expect(sourceNotes.getByText(note, { exact: true })).toBeVisible();
  await screenshot('source-notes');

  // Every personal claim in the career surface must be a literal source substring.
  for (const text of await page.locator('[data-source-copy]').allTextContents()) {
    expect(text.trim().length).toBeGreaterThan(0);
    expect(source.includes(text.trim()), `Unapproved or rewritten copy: ${text}`).toBe(true);
  }
  step('Unfilled personal interests remain TODOs; the existing portrait toggle and bag are still available.');
  await expect(page.getByTestId('personal-notes')).toContainText('TODO');
  await expect(page.getByTestId('favourite-card')).toHaveCount(5);
  for (const card of await page.getByTestId('favourite-card').all()) await expect(card).toContainText('TODO');
  await page.getByRole('button', { name: 'Cartoon', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Cartoon', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Open inventory', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Hair bow', exact: true }).click();
  await expect(page.getByTestId('item-2')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open inventory', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Normal', exact: true }).click();
  await noOverflow();

  step('Reduced-motion and dark-system check: the approved cream page and all disclosures remain usable.');
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(255, 252, 245)');
  await noOverflow();
  await screenshot('reduced-motion-dark-system');
  await page.getByRole('link', { name: 'Back to top' }).click();
  await expect(page.getByRole('heading', { name: 'PORTFOLIO', exact: true })).toBeInViewport();
  step('Result: verbatim source, five employers, both Books To Go titles, navigation and keyboard disclosures passed. New portraits remain usable.');
  await page.waitForTimeout(2000);
  expect(errors).toEqual([]);
  expect(badResponses).toEqual([]);
  const captionFile = testInfo.outputPath('video.webm.md');
  await writeFile(captionFile, captions.join('\n') + '\n');
  await testInfo.attach('captions', { path: captionFile, contentType: 'text/markdown' });
});
