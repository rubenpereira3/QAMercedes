const { By, until } = require("selenium-webdriver");

class DetailPage {
    constructor(driver) {
        this.driver = driver;
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

    async getModelYear() {
        const locator = '//li[@data-test-id="dcp-vehicle-details-list-item-2"]/span[2]';
        
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        const modelYear = await this.driver.findElement(By.xpath(locator)).getText();
        return modelYear;
    }
    
    async getVin() {
        const locator = '//li[@data-test-id="dcp-vehicle-details-list-item-10"]/span[2]';
    
        const vin = await this.driver.findElement(By.xpath(locator)).getText();
        return vin;
    }
    
    async getErrorMessage() {
        const locator = '//p[@class="dcp-error-message__error-hint"]';
        
        const error = await this.driver.findElement(By.xpath(locator)).getText();
        return error;
    }
} 

module.exports = {
    DetailPage
};