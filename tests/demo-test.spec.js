// Test specification for testing https://www.demoblaze.com/index.html

const { test, expect } = require ('@playwright/test');

test.beforeEach(async ({ page }) =>{
    await page.goto('https://www.demoblaze.com/index.html');
});

test('verify the logo is present', async ({ page }) => {
await expect(page.locator('#nava')).toBeVisible();
});