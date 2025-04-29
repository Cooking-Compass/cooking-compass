import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('Explore Page', async ({ page }) => {
  await page.goto('http://localhost:3000/explore');
});
