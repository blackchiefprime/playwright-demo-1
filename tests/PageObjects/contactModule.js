const { expect, locator } = require('@playwright/test');

exports.ContactObjects = class ContactObjects {
    constructor(page){
        this.page = page;
        this.contactButton = page.locator(".nav-link:has-text('Contact')");
        this.contactCross = page.locator('#exampleModal > div > div > div.modal-header > button > span');
        this.contactTitle = page.locator('#exampleModalLabel');
        this.contactEmailField = page.locator('#recipient-email');
        this.contactNameField = page.locator('#recipient-name');
        this.contactMessage = page.locator('#message-text');
        this.contactCloseButton = page.locator('#exampleModal > div > div > div.modal-footer > button.btn.btn-secondary');
        this.contactSendMessage = page.locator('#exampleModal > div > div > div.modal-footer > button.btn.btn-primary')
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