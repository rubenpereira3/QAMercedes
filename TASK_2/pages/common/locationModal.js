const { By, Select, until } = require("selenium-webdriver");

class LocationModal {
    constructor(driver) {
        this.driver = driver;
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
    
    async pressCloseButton() {
        const locator = '//*[@data-test-id="state-selected-modal__close"]';
    
        const button = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(locator))), 10000);
        await button.click();
        
        await this.driver.wait(until.elementLocated(By.xpath("//div[@data-test-id='modal-popup__location']//div[@class='wb-modal-dialog__backdrop']")), 15000);
        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@data-test-id='modal-popup__location']//div[@class='wb-modal-dialog__backdrop']"))), 15000);
    }
}

module.exports = {
    LocationModal
};