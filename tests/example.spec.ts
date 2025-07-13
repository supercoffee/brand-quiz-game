import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8123');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Amazon/);
});


test('initial game state', async ({ page }) => {

  await page.route('**/data.json', async route => {
    const json = [
      {name: 'some junk', type: 'amzn'}
    ]
    await route.fulfill({ json });
  });

  await page.goto('http://localhost:8123');

  await expect(page.locator('#txtProductName')).toContainText('some junk');

  const btnAmzn = page.locator('#btnAmzn');
  const btnDoc = page.locator('#btnDoc');

  await expect(btnAmzn).toBeVisible();
  await expect(btnAmzn).toHaveText('Add to cart');

  await expect(btnDoc).toBeVisible();
  await expect(btnDoc).toHaveText('Ask my doctor');
});


test('add to cart and next button', async ({ page }) => {
  await page.route('**/data.json', async route => {
    const json = [
      { name: 'some junk', type: 'amzn' }
    ];
    await route.fulfill({ json });
  });

  await page.goto('http://localhost:8123');

  await expect(page.locator('#txtProductName')).toContainText('some junk');

  const btnAmzn = page.locator('#btnAmzn');
  const btnDoc = page.locator('#btnDoc');
  const txtResult = page.locator('#txtResult');
  const btnNext = page.locator('#btnNext');
  const txtScore = page.locator('#txtScore');

  await btnAmzn.click();

  await expect(txtResult).toContainText(/correct/i);
  await expect(txtScore).toContainText('1');
  await expect(btnNext).toBeVisible();
  await expect(btnAmzn).toBeHidden();
  await expect(btnDoc).toBeHidden();
});
