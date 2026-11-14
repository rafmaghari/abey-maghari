import { defineConfig } from '@playwright/test';

const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'small-phone', width: 360, height: 740 },
  { name: 'desktop', width: 1440, height: 900 },
];

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  timeout: 120_000,
  reporter: [['list']],
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3098', screenshot: 'only-on-failure' },
  projects: ['chromium', 'webkit'].flatMap(browser => viewports.map(viewport => ({
    name: `${browser}-${viewport.name}`,
    use: { browserName: browser as 'chromium' | 'webkit', viewport: { width: viewport.width, height: viewport.height } },
  }))),
});
