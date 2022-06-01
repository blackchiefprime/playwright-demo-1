const { expect, locator } = require('@playwright/test');

exports.SignUpObjects = class SignUpObjects {
    constructor(page){
        this.page = page;
        this.navlogo = page.locator('#nava');
        this.signup = page.locator('#signin2');
        this.signupUsernameField = page.locator('#sign-username');
        this.signupPasswordField = page.locator('#sign-password');
        this.signupConfirm = page.locator('#signInModal > div > div > div.modal-footer > button.btn.btn-primary');
    }
    async enterDetails(username, password)
    {
        await this.signup.click();
        await this.signupUsernameField.fill(username);
        await this.signupPasswordField.fill(password);
        await this.signupConfirm.click();
    };
}