const { until, By } = require("selenium-webdriver");

const timeout = 5000;

async function checkPageTitle(driver, title) {
    await driver.wait(until.titleIs(title), timeout);
}

async function checkFilterButton(driver) {
    await driver.wait(until.elementIsEnabled(driver.findElement(By.className('filter-toggle')), timeout));
}

async function getModelYear(driver) {
    const locator = '/html/body/div/div[1]/main/div/div[1]/div[4]/div/div/div/div/div/ul/li[2]/span[2]';
    const x = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(locator))), timeout  * 4).getText();
    console.log('Model Year: ' + x);
}

async function getVin(driver) {
    const locator = '/html/body/div/div[1]/main/div/div[1]/div[4]/div/div/div/div/div/ul/li[11]/span[2]';
    const x = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(locator))), timeout  * 4).getText();
    console.log('VIN: ' + x);
}

module.exports = {
    checkPageTitle,
    checkFilterButton,
    getModelYear,
    getVin
};