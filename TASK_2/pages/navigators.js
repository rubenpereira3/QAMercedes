const { By, Select, until } = require("selenium-webdriver");

class Navigators {
    constructor(driver) {
        this.driver = driver;
    }

    async pressAcceptAllCookiesButton() {
        const shadowLocator = '//*[@settings-id="Kvbnw4-6_"]';
        const buttonLocator = '[data-test="handle-accept-all-button"]';
    
       await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))));
       
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
        
        await this.driver.wait(until.elementLocated(By.xpath("//div[@data-test-id='modal-popup__location']//div[@class='wb-modal-dialog__backdrop']")), 15000);
        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@data-test-id='modal-popup__location']//div[@class='wb-modal-dialog__backdrop']"))), 15000);
    }
    
    async pressFilterButton() {
        const locator = '//*[@class="filter-toggle"]';
        const filterScreenLocator = '//div[@class="wrapper show"]//h3[contains(@data-test-id, "row-headline")]';

        try {
            await this.driver.wait(until.elementLocated(By.xpath(locator)), 15000);
            const button = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 12000);
            await button.click();

            await this.driver.wait(until.elementLocated(By.xpath(filterScreenLocator)), 10000);
        } catch(e) {
            await this.driver.wait(until.elementLocated(By.xpath(locator)), 15000);
            const button = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 12000);
            await button.click();

            await this.driver.wait(until.elementLocated(By.xpath(filterScreenLocator)), 10000);
        } 
    }
    
    async clickPreOwnTab() {
        const locator = '//button[./span[contains(text(), "Pre-Owned")]]';
        
        const button = await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(locator))), 15000);
        await button.click();
        
        await this.driver.wait(until.elementLocated(By.xpath("//div[@class='dcp-loading-spinner']"), 15000));
        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']")), 15000));
    }
    
    async clickOnColorFilter() {
        const locator = '//div[@class = "category-filter-row" and .//*[text() = "Colour"]]';
    
        await this.driver.wait(until.elementLocated(By.xpath(locator)), 5000);
        const colorFilter = await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(locator))), 5000);
        await colorFilter.click();
    }
    
    async selectColorOption(color) {
        const colorSelectLocator = '//*[@data-test-id="multi-select-dropdown-card-opener" and ./span[contains(text(), "Colour")]]';
        const colorValueLocator = `//li/a[contains(text(), "${color}")]`;
        
        const x = await this.driver.wait(until.elementLocated(By.xpath(colorSelectLocator)), 15000);
        await x.click();
        
        const colorOption = await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(colorValueLocator))), 5000);
        await colorOption.click();
    }
    
    async closeFilterModal() {
        const locator = '//div[@class="sidebar"]//*[@class="close-button show"]';
        
        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))));

        const close = await this.driver.wait(until.elementLocated(By.xpath(locator)), 5000);
        await close.click();
    }
    
    async selectFilterOption(value) {
        const locator = '//div[@id="srp-result"]//select';
        const selectOptionLocator = `${locator}/option[@value = "${value}"]`;

        const select = await this.driver.wait(until.elementLocated(By.xpath(locator)), 5000);
        await select.click();

        const option = await this.driver.wait(until.elementLocated(By.xpath(selectOptionLocator)), 5000);
        await option.click();
        /*const selectElement = await this.driver.findElement(By.xpath(locator));
        const select = new Select(selectElement);
    
        await select.selectByValue(value);*/

        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))));
    }
    
    async clickOnFirstResult(value) {
        const locator = '//div[contains(@class, "dcp-cars-srp-results")]/div[@class="dcp-cars-srp-results__tile"][1]';

        let result = await this.driver.wait(until.elementLocated(By.xpath(locator)), 5000);
        await result.click();
    }
    
    async clickOnEnquireNow() {
        const locator = '[data-test-id="dcp-buy-box__contact-seller"]';
        await this.driver.findElement(By.css(locator)).click();
    }

    async insertFirstName(firstName) {
        const locator = '//div[@data-test-id="rfq-contact__first-name"]//input[@type="text"]';
        
        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))));
    
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