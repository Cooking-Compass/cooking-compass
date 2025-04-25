import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('About Page', async ({ page }) => {
  await page.goto('http://localhost:3000/about');
});
