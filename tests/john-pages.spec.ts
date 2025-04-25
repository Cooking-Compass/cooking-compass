import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json', // Simulate logged-in state for John
});

test('RecipeCard should display recipe details', async ({ page }) => {
  await page.goto('http://localhost:3000/recipes');
  await expect(page.getByText('Recipe Name')).toBeVisible(); // Replace with actual recipe name
  await expect(page.getByText('Recipe Description')).toBeVisible(); // Replace with actual description
  await expect(page.locator('img[alt="Recipe Image"]')).toBeVisible(); // Replace with actual alt text
});

test('Login Page should allow user to log in', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/'); // Redirect after login
});

test('Signup Page should allow user to create an account', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signup');
  await page.fill('input[name="email"]', 'newuser@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.fill('input[name="confirmPassword"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/auth/signin'); // Redirect after signup
});

test('Signin Page should allow user to sign in', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/'); // Redirect after successful sign-in
});

test('RecipeList should display a list of recipes', async ({ page }) => {
  await page.goto('http://localhost:3000/recipes');
  await expect(page.getByRole('heading', { name: 'Recipes' })).toBeVisible();
  await expect(page.getByText('Recipe Name')).toBeVisible(); // Replace with actual recipe name
});

test('ReportForm should allow user to submit a report', async ({ page }) => {
  await page.goto('http://localhost:3000/report');
  await page.fill('input[name="yourname"]', 'John Doe');
  await page.fill('input[name="criminal"]', 'Bad Actor');
  await page.fill('textarea[name="description"]', 'This is a test report.');
  await page.selectOption('select[name="reason"]', 'Innapropriate'); // Replace with actual option value
  await page.click('button[type="submit"]');
  await expect(page.getByText('Report submitted successfully!')).toBeVisible();
});

test('SubmitRecipe should allow user to submit a recipe', async ({ page }) => {
  await page.goto('http://localhost:3000/submit-recipe');
  await expect(page.getByRole('heading', { name: 'Submit Your Recipe' })).toBeVisible();
  await page.fill('input[name="name"]', 'Test Recipe');
  await page.fill('textarea[name="description"]', 'This is a test recipe.');
  await page.fill('input[name="ingredients"]', 'Flour, Sugar, Eggs');
  await page.fill('textarea[name="instructions"]', 'Mix and bake.');
  await page.fill('textarea[name="image"]', 'http://example.com/image.jpg');
  await page.click('button[type="submit"]');
  await expect(page.getByText('Recipe submitted successfully!')).toBeVisible();
});

test('SubmitRecipeForm should validate form fields', async ({ page }) => {
  await page.goto('http://localhost:3000/submit-recipe');
  await page.click('button[type="submit"]'); // Submit without filling fields
  await expect(page.getByText('Recipe title is required')).toBeVisible();
  await expect(page.getByText('Description is required')).toBeVisible();
  await expect(page.getByText('Ingredients are required')).toBeVisible();
  await expect(page.getByText('Instructions are required')).toBeVisible();
  await expect(page.getByText('Image is required')).toBeVisible();
});
