const { By, until, Select } = require("selenium-webdriver");

const timeout = 5000;

async function pressAcceptAllCookiesButton(driver) {
    const cookieBanner = await driver.findElement(By.css('[settings-id="Kvbnw4-6_"]'));
    const shadowRoot = await cookieBanner.getShadowRoot();

    const acceptButton = await shadowRoot.findElement(By.css('[data-test="handle-accept-all-button"]'));
    await acceptButton.click();
}

async function selectStateOption(driver, value) {
    const selectElement = await driver.findElement(By.xpath('/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/wb-select-control/wb-select/select'));
    const select = new Select(selectElement);
    await select.selectByVisibleText(value);
}

async function insertPostalCode(driver, postalCode) {
    await driver.findElement(By.xpath('/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/wb-input-control/wb-input/input')).sendKeys(postalCode);
}

async function pressPrivateRadioButton(driver) {
    await driver.findElement(By.xpath('/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/div/div/wb-radio-control[1]')).click();
}

async function pressModalCloseButton(driver) {
    await driver.wait(until.elementIsEnabled(driver.findElement(By.css('[data-test-id="state-selected-modal__close"'))), timeout).click();
}

async function pressFilterButton(driver) {
    await driver.findElement(By.className('filter-toggle')).click();
}

async function clickPreOwnTab(driver) {
    await driver.findElement(By.xpath('/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/wb-tabs/wb-tab-bar/wb-tab[1]')).click();
}

async function clickOnColorFilter(driver) {
    await driver.findElement(By.xpath('/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div')).click();
}

async function selectColorOption(driver) {
    const colorSelectLocator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div/div[2]/div/div/a';
    const colorValueLocator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div/div[2]/div/div/ul/li[2]/a';
    
    await driver.findElement(By.xpath(colorSelectLocator)).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(colorValueLocator))), 10000).click();
}

async function closeFilterModal(driver) {
    const closeBtnLocator = '//*[@id="app"]/div[1]/main/div[2]/div[1]/div[2]/div[1]/span/span';
    await driver.findElement(By.xpath(closeBtnLocator)).click();
}

module.exports = {
    pressAcceptAllCookiesButton,
    selectStateOption,
    insertPostalCode,
    pressPrivateRadioButton,
    pressModalCloseButton,
    pressFilterButton,
    clickPreOwnTab,
    clickOnColorFilter,
    selectColorOption,
    closeFilterModal
};