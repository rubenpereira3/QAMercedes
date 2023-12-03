const { until, By } = require("selenium-webdriver");

const timeout = 5000;

async function checkPageTitle(driver, title) {
    await driver.wait(until.titleIs(title), timeout);
}

async function getModelYear(driver) {
    const locator = '//li[@data-test-id="dcp-vehicle-details-list-item-2"]/span[2]';
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const modelYear = await driver.findElement(By.xpath(locator)).getText();
    return modelYear;
}

async function getVin(driver) {
    const locator = '//li[@data-test-id="dcp-vehicle-details-list-item-10"]/span[2]';

    const vin = await driver.findElement(By.xpath(locator)).getText();
    return vin;
}

async function getErrorMessage(driver) {
    const locator = '/html/body/div/div[1]/main/div/div[1]/div[7]/div/div[1]/div/div[2]/div/div/div/div/div[3]/p';
    
    const error = await driver.findElement(By.xpath(locator)).getText();
    return error;
}

module.exports = {
    checkPageTitle,
    getModelYear,
    getVin,
    getErrorMessage
};