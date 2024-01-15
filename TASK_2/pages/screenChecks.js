const { until, By } = require("selenium-webdriver");

const timeout = 5000;

class ScreenChecks {
    constructor(driver) {
        this.driver = driver;
    }
    
    async checkPageTitle(title) {
        await this.driver.wait(until.titleIs(title), timeout);
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
        const locator = '/html/body/div/div[1]/main/div/div[1]/div[7]/div/div[1]/div/div[2]/div/div/div/div/div[3]/p';
        
        const error = await this.driver.findElement(By.xpath(locator)).getText();
        return error;
    }
}

module.exports = {
    ScreenChecks
};