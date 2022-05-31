// Test specification for testing https://www.demoblaze.com/index.html
//Requirements TBD
//Sign Up
//login
//Logout
//Contact
//Add single item to cart
//Purchase Items in cart
//Error Handling Tests

const { test, expect } = require ('@playwright/test');

test.beforeEach(async ({ page }) =>{
    await page.goto('https://www.demoblaze.com/index.html');
});

const existingUsername = 'jjabrams';
const existingPassword = 'ruinedstarwars';

const newUsername = 'somehow1988';
const newPassword = 'palpatinereturned';

test('verify the logo is present', async ({ page }) => {
await expect(page.locator('#nava')).toBeVisible();
});

test.describe('Sign Up Tests', () => {
    test('sign up for a new account', async ({ page }) => {
        // Click on signup button
        await page.locator('#signin2').click();
        // Fill in username
        await page.locator('#sign-username').fill(newUsername);
        // Fill in password
        await page.locator('#sign-password').fill(newPassword);
        // Click sign-up
        await page.locator('#signInModal > div > div > div.modal-footer > button.btn.btn-primary').click();
        // If sign up is successful, then pop-up will be dismissed
        await expect(page.locator('#signInModal > div > div')).toBeHidden();
    });
});

test.describe('Log in Tests', () => {
    test('log in with existing account', async ({ page }) => {
        await page.locator('#login2').click();
        await page.locator('#loginusername').fill(existingUsername);
        await page.locator('#loginpassword').fill(existingPassword);
        await page.locator('#logInModal > div > div > div.modal-footer > button.btn.btn-primary').click();
        await expect(page.locator('#nameofuser')).toContainText('Welcome '+ existingUsername);
    })
})

test.describe('Log out tests', () => {
    test('log out with existing account', async ({ page }) => {
        await page.locator('#login2').click();
        await page.locator('#loginusername').fill(existingUsername);
        await page.locator('#loginpassword').fill(existingPassword);
        await page.locator('#logInModal > div > div > div.modal-footer > button.btn.btn-primary').click();
        await page.locator('#logout2').click();
        await expect(page.locator('#login2')).toContainText('Log In');
    })
})