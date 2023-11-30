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
    await driver.findElement(By.css('[data-test-id="state-selected-modal__close"')).click();
}

async function pressFilterButton(driver) {
    await driver.findElement(By.className('filter-toggle')).click();
}

async function clickPreOwnTab(driver) {
    await driver.findElement(By.xpath('/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/wb-tabs/wb-tab-bar/wb-tab[1]')).click();
}

module.exports = {
    pressAcceptAllCookiesButton,
    selectStateOption,
    insertPostalCode,
    pressPrivateRadioButton,
    pressModalCloseButton,
    pressFilterButton,
    clickPreOwnTab
};