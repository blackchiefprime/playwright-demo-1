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
import { signupModule } from './PageObjects/signupModule';

const users = {
    existingUsername: "jjabrams",
    existingPassword: "ruinedstarwars",
    newUsername: "somehow198999",
    newPassword: "palpatinereturned"
};

const selectors = {
    login: '#login2',
    loginUsernameField: '#loginusername',
    loginPasswordField: '#loginpassword',
    loginConfirm: '#logInModal > div > div > div.modal-footer > button.btn.btn-primary',
    logout: '#logout2'
};


test.beforeEach(async ({ page }) =>{
    await page.goto('https://www.demoblaze.com/index.html');
});



test('verify the logo is present', async ({ page }) => {
await expect(page.locator(selectors.navlogo)).toBeVisible();
});

test.describe('Sign Up Tests', () => {
    test('sign up for a new account', async ({ page }) => {
        /*// Click on signup button
        await page.locator(selectors.signup).click();
        // Fill in username
        await page.locator(selectors.signupUsernameField).fill(users.newUsername);
        // Fill in password
        await page.locator(selectors.signingPasswordField).fill(users.newPassword);
        // Click sign-up
        await page.locator(selectors.signupConfirm).click();
        // If sign up is successful, then pop-up will be dismissed*/
        const SignupModule = new signupModule(page);
        await SignupModule.enterDetails(users.existingUsername, users.existingPassword);
        page.once('dialog', dialog => {
            expect(dialog.message()).toBe('Sign up successful')
            dialog.dismiss().catch(() => {});
        });
        await expect(page.locator('#signInModal > div > div')).not.toBeVisible();
    });
});

test.describe('Log in Tests', () => {
    test('log in with existing account', async ({ page }) => {
        await page.locator(selectors.login).click();
        await page.locator(selectors.loginUsernameField).fill(users.existingUsername);
        await page.locator(selectors.loginPasswordField).fill(users.existingPassword);
        await page.locator(selectors.loginConfirm).click();
        await expect(page.locator('#nameofuser')).toContainText('Welcome '+ users.existingUsername);
    })
})

test.describe('Log out tests', () => {
    test('log out with existing account', async ({ page }) => {
        await page.locator(selectors.login).click();
        await page.locator(selectors.loginUsernameField).fill(users.existingUsername);
        await page.locator(selectors.loginPasswordField).fill(users.existingPassword);
        await page.locator(selectors.loginConfirm).click();
        await page.locator(selectors.logout).click();
        await expect(page.locator(selectors.login)).toContainText('Log in');
    })
})