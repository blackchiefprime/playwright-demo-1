const { expect, locator } = require('@playwright/test');

exports.ContactObjects = class ContactObjects {
    constructer(page){
        this.page = page;
        this.contactButton = page.locator(".nav-link:has-text('Contact')");
        this.contactCross = page.selector('#exampleModal > div > div > div.modal-header > button > span');
        this.contactTitle = page.selector('#exampleModalLabel');
        this.contactEmailField = page.selector('##recipient-email');
        this.contactNameField = page.selector('#recipient-name');
        this.contactMessage = page.selector('#message-text');
        this.contactCloseButton = page.selector('#exampleModal > div > div > div.modal-footer > button.btn.btn-secondary');
        this.contactSendMessage = page.selector('#exampleModal > div > div > div.modal-footer > button.btn.btn-primary')
    };
    async enterContactMessage(email, name, message)
    {
        await this.contactButton.click();
        await this.contactEmailField.fill(email);
        await this.contactNameField.fill(name);
        await this.contactMessage.fill(message);
        await this.contactSendMessage.click();
    };
};