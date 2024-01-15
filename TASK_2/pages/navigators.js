const { By, Select, until } = require("selenium-webdriver");

class Navigators {
    constructor(driver) {
        this.driver = driver;
    }

    async pressAcceptAllCookiesButton() {
        const shadowLocator = '//*[@settings-id="Kvbnw4-6_"]';
        const buttonLocator = '[data-test="handle-accept-all-button"]';
    
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const cookieBanner = await this.driver.wait(until.elementLocated(By.xpath(shadowLocator)), 10000);
        const shadowRoot = await cookieBanner.getShadowRoot();
        
        const acceptButton = await shadowRoot.findElement(By.css(buttonLocator));
        await acceptButton.click();
    }
    
    async selectStateOption(value) {
        const locator = '/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/wb-select-control/wb-select/select';
    
        const selectElement = await this.driver.findElement(By.xpath(locator));
        const select = new Select(selectElement);
        await select.selectByVisibleText(value);
    }
    
    async insertLocationPostalCode(postalCode) {
        const locator = '//*[@aria-labelledby="postal-code-hint"]';

        for (let i = 0; i < postalCode.length; i++)
            await this.driver.findElement(By.xpath(locator)).sendKeys(postalCode[i]);
    }
    
    async pressPrivateRadioButton() {
        const locator = '/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/div/div/wb-radio-control[1]';
        await this.driver.findElement(By.xpath(locator)).click();
    }
    
    async pressModalCloseButton() {
        const locator = '//*[@data-test-id="state-selected-modal__close"]';
    
        const button = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 10000);
        await button.click();
    }
    
    async pressFilterButton() {
        const locator = '//div/*[@class="filter-toggle"]';
        
        const button = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 12000);
        await button.click();
    }
    
    async clickPreOwnTab() {
        const locator = '//button[./span[contains(text(), "Pre-Owned")]]';
        
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(locator))), 15000);
        const button = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 15000);
        await button.click();
        
        await new Promise(resolve => setTimeout(resolve, 12000));
    }
    
    async clickOnColorFilter() {
        const locator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div';
        await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000).click();
    }
    
    async selectColorOption(color) {
        const colorSelectLocator = '//*[@data-test-id="multi-select-dropdown-card-opener" and ./span[contains(text(), "Colour")]]';
        const colorValueLocator = `//li/a[contains(text(), "${color}")]`;
        
        const x = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(colorSelectLocator))), 15000);
        await x.click();
        await this.driver.findElement(By.xpath(colorValueLocator)).click();
    }
    
    async closeFilterModal() {
        const locator = '//div[@class="sidebar"]//*[@class="close-button show"]';
        
        await new Promise(resolve => setTimeout(resolve, 5000))

        await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(locator))), 5000);
        const close = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await close.click();
    }
    
    async selectFilterOption(value) {
        const locator = '/html/body/div/div[1]/main/div[2]/div[1]/div[2]/div[2]/div[2]/wb-select-control/wb-select/select';
        
        const selectElement = await this.driver.findElement(By.xpath(locator));
        const select = new Select(selectElement);
    
        await select.selectByValue(value);
    }
    
    async clickOnFirstResult(value) {
        const locator = '//*[@class="dcp-cars-srp-results__tile"]';
        
        await new Promise(resolve => setTimeout(resolve, 5000));

        const result = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await result.click();
    }
    
    async clickOnEnquireNow() {
        const locator = '[data-test-id="dcp-buy-box__contact-seller"]';
        await this.driver.findElement(By.css(locator)).click();
    }

    async insertFirstName(firstName) {
        const locator = '//div[@data-test-id="rfq-contact__first-name"]//input[@type="text"]';
        
        await new Promise(resolve => setTimeout(resolve, 5000));
    
        const input = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await input.sendKeys(firstName);
    }
    
    async insertLastName(lastName) {
        const locator = '//div[@data-test-id="rfq-contact__last-name"]//input';
    
        const input = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await input.sendKeys(lastName);
    }
    
    async insertEmail(email) {
        const locator = '//div[@data-test-id="rfq-contact__email"]//input';
    
        const input = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await input.sendKeys(email);
    }
    
    async insertPhoneNumber(phoneNumber) {
        const locator = '//div[@data-test-id="rfq-contact__phone"]//input';
    
        const input = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await input.sendKeys(phoneNumber);
    }
    
    async insertPostalCode(postalCode) {
        const locator = '//div[@data-test-id="rfq-contact__postal-code"]//input';
        
        const input = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 5000);
        await input.sendKeys(postalCode);
    }
    
    async clickOnProceedButton() {
        const locator = '[data-test-id="dcp-rfq-contact-button-container__button-next"';
        await this.driver.findElement(By.css(locator)).click();
    }
}

module.exports = {
    Navigators
};