import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('Submit Recipe', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('http://localhost:3000');
  await page.goto('http://localhost:3000/addrecipe');
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('title');
  await page.locator('input[name="image"]').click();
  await page.locator('input[name="image"]').fill('image');
  await page.locator('textarea[name="ingredients"]').click();
  await page.locator('textarea[name="ingredients"]').fill('ingred');
  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill('desc');
  await page.locator('textarea[name="instructions"]').click();
  await page.locator('textarea[name="instructions"]').fill('instruction');
  await page.getByRole('button', { name: 'Submit' }).click();
});
