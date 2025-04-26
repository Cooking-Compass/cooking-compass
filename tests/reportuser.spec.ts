import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('Report User', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('http://localhost:3000');
  await page.goto('http://localhost:3000/report');
  await page.locator('input[name="yourname"]').click();
  await page.locator('input[name="yourname"]').fill('my name');
  await page.locator('input[name="criminal"]').click();
  await page.locator('input[name="criminal"]').fill('this person');
  await page.getByRole('combobox').selectOption('Disgusting');
  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill('bad guy');
  await page.getByRole('button', { name: 'Submit' }).click();
});
