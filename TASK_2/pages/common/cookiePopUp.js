const { By, until } = require("selenium-webdriver");

class CookiePopUp {
    constructor(driver) {
        this.driver = driver;
    }

    async pressAcceptAllButton() {
        const shadowLocator = '//*[@settings-id="Kvbnw4-6_"]';
        const buttonLocator = '[data-test="handle-accept-all-button"]';
    
       await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))));
       
        const cookieBanner = await this.driver.wait(until.elementLocated(By.xpath(shadowLocator)), 10000);
        const shadowRoot = await cookieBanner.getShadowRoot();
        
        const acceptButton = await shadowRoot.findElement(By.css(buttonLocator));
        await acceptButton.click();
    }

    async checkPageTitle(title) {
        await this.driver.wait(until.titleIs(title), 20000);
    }
}

module.exports = {
    CookiePopUp
};