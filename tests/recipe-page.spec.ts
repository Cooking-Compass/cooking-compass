import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/recipe');
  await page.getByRole('heading', { name: 'Apple Pie' }).click();
  await page.getByRole('img', { name: 'Apple Pie' }).click();
  await page.getByRole('heading', { name: 'About This Recipe' }).click();
  await page.getByText('Growing up in a small town,').click();
  await page.getByText('I never understood why her').click();
  await page.getByText('Now, whenever I bake this').click();
  await page.getByText('Apple PieAbout This').click();
  await page.getByText('About This RecipeGrowing up').click();
  await page.getByText('Now, whenever I bake this').click();
  await page.getByRole('heading', { name: 'Ingredients' }).click();
  await page.getByText('6 to 8 apples (Granny Smith').click();
  await page.getByText('cup granulated sugar').click();
  await page.getByText('tablespoons all-purpose flour').click();
  await page.getByText('teaspoon ground cinnamon').click();
  await page.getByText('/4 teaspoon ground nutmeg').click();
  await page.getByText('tablespoon lemon juice').click();
  await page.getByText('1 tablespoon butter, cut into').click();
  await page.getByText('1 package refrigerated pie').click();
  await page.getByRole('heading', { name: 'Instructions' }).click();
  await page.getByText('Preheat your oven to 425°F (220°C)').click();
  await page.getByText('Peel, core, and slice the').click();
  await page.getByText('In a large bowl, combine the').click();
  await page.getByText('Roll out one pie crust and').click();
  await page.getByText('Pour the apple mixture into').click();
  await page.getByText('Roll out the second pie crust').click();
  await page.getByText('Bake in the preheated oven').click();
  await page.getByText('Let the pie cool for at least').click();
});
