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
const { ContactObjects } = require('./PageObjects/contactModule');

const users = {
    existingUsername: "jjabrams",
    existingPassword: "ruinedstarwars",
    newUsername: "somehow19899911",
    newPassword: "palpatinereturned"
};

const contactDetails = {
    contactEmail: "jangofett@kaminoclones.com",
    contactName: "Jango F",
    contactMessage: "We pan down from the twin suns of Tatooine. We are now close on the mouth of the Sarlacc pit. After a beat, the gloved Mandalorian armor gauntlet of Boba Fett grabs onto the sand outside the Sarlacc pit, and the feared bounty hunter pulls himself from the maw of the sand beast.",
}

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

test.describe('Contact Us Tests', () => {
    test('send a message in Contact Us', async ({ page }) => {
        const ContactModule = new ContactObjects(page);
        await ContactModule.enterContactMessage(contactDetails.contactEmail, contactDetails.contactName, contactDetails.contactMessage);
    })
})