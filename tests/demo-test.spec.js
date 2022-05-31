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

const users = {
    existingUsername: "jjabrams",
    existingPassword: "ruinedstarwars",
    newUsername: "somehow1988",
    newPassword: "palpatinereturned"
};

const selectors = {
    navlogo: '#nava',
    signup: '#signin2',
    signupUsernameField: '#sign-username',
    signingPasswordField: '#sign-password',
    signupConfirm: '#signInModal > div > div > div.modal-footer > button.btn.btn-primary',
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
await expect(page.locator(navlogo)).toBeVisible();
});

test.describe('Sign Up Tests', () => {
    test('sign up for a new account', async ({ page }) => {
        // Click on signup button
        await page.locator(signup).click();
        // Fill in username
        await page.locator(signupUsernameField).fill(newUsername);
        // Fill in password
        await page.locator(signingPasswordField).fill(newPassword);
        // Click sign-up
        await page.locator(signupConfirm).click();
        // If sign up is successful, then pop-up will be dismissed
        await expect(page.locator('#signInModal > div > div')).toBeHidden();
    });
});

test.describe('Log in Tests', () => {
    test('log in with existing account', async ({ page }) => {
        await page.locator(login).click();
        await page.locator(loginUsernameField).fill(existingUsername);
        await page.locator(loginPasswordField).fill(existingPassword);
        await page.locator(loginConfirm).click();
        await expect(page.locator('#nameofuser')).toContainText('Welcome '+ existingUsername);
    })
})

test.describe('Log out tests', () => {
    test('log out with existing account', async ({ page }) => {
        await page.locator(login).click();
        await page.locator(loginUsernameField).fill(existingUsername);
        await page.locator(loginPasswordField).fill(existingPassword);
        await page.locator(loginConfirm).click();
        await page.locator(logout).click();
        await expect(page.locator(login)).toContainText('Log In');
    })
})