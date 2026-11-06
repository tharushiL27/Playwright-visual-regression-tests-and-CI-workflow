import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing on SauceDemo', () => {
  
  test('Visual check of the Login Page', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // 2. Wait for the login button to ensure the page is fully loaded
    await page.waitForSelector('#login-button');

    // 3. Compare the screenshot against the baseline
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('Visual check of the Inventory Catalog Page', async ({ page }) => {
    // 1. Log in to the application
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // 2. Wait for the inventory container to be visible
    await page.waitForSelector('.inventory_container');

    // 3. Compare the inventory page against the baseline
    await expect(page).toHaveScreenshot('inventory-page.png');
  });

  test('Visual check of a single item card', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  
    // Locate only the first inventory item
    const firstItem = page.locator('.inventory_item').first();
  
    // Compare snapshot of just that element
    await expect(firstItem).toHaveScreenshot('first-product-card.png');
  });

  test('Visual check masking dynamic text', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  
    await expect(page).toHaveScreenshot('inventory-masked.png', {
      // Masks product titles so variations won't trigger a visual failure
      mask: [page.locator('.inventory_item_name')],
    });
  });

  

});