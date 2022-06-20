const { expect, locator } = require('@playwright/test');

exports.loginObjects = class loginObjects {
constructor(page){
    this.page = page;
    this.login = page.locator('#login2');
    this.loginUsernameField = page.locator('#loginusername');
    this.loginPasswordField = page.locator('#loginpassword');
    this.loginConfirm = page.locator('#logInModal > div > div > div.modal-footer > button.btn.btn-primary');
    this.logout = page.locator('#logout2'); 
};
async loginDetails (username, password)
{
    await this.login.click();
    await this.loginUsernameField.fill(username);
    await this.loginPasswordField.fill(password);
    await this.loginConfirm.click();
};

async logoutDetails()
{
    await this.logout.click();
};
}