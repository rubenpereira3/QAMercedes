const { until, By } = require("selenium-webdriver");

const timeout = 5000;

async function checkPageTitle(driver, title) {
    await driver.wait(until.titleIs(title), timeout);
}

async function checkFilterButton(driver) {
    await driver.wait(until.elementIsEnabled(driver.findElement(By.className('filter-toggle')), timeout));
}

module.exports = {
    checkPageTitle,
    checkFilterButton
};