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
const { SignUpObjects } = require ('./PageObjects/signupModule');

const users = {
    existingUsername: "jjabrams",
    existingPassword: "ruinedstarwars",
    newUsername: "somehow19899911",
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
        const SignupModule = new SignUpObjects(page);
        await SignupModule.enterDetails(users.newUsername, users.newPassword);
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual('Sign up successful.')
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