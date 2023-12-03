const { By, Select } = require("selenium-webdriver");

async function pressAcceptAllCookiesButton(driver) {
    const shadowLocator = '[settings-id="Kvbnw4-6_"]';
    const buttonLocator = '[data-test="handle-accept-all-button"]';

    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const cookieBanner = await driver.findElement(By.css(shadowLocator));
    const shadowRoot = await cookieBanner.getShadowRoot();

    const acceptButton = await shadowRoot.findElement(By.css(buttonLocator));
    await acceptButton.click();
}

async function selectStateOption(driver, value) {
    const locator = '/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/wb-select-control/wb-select/select';

    const selectElement = await driver.findElement(By.xpath(locator));
    const select = new Select(selectElement);
    await select.selectByVisibleText(value);
}

async function insertLocationPostalCode(driver, postalCode) {
    const locator = '/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/wb-input-control/wb-input/input';

    await new Promise(resolve => setTimeout(resolve, 500));

    await driver.findElement(By.xpath(locator)).sendKeys(postalCode);
}

async function pressPrivateRadioButton(driver) {
    const locator = '/html/body/div[1]/div[1]/header/div/div[4]/div[1]/div/div[1]/div/div/div/wb-radio-control[1]';
    await driver.findElement(By.xpath(locator)).click();

    await new Promise(resolve => setTimeout(resolve, 2000));
}

async function pressModalCloseButton(driver) {
    const locator = '[data-test-id="state-selected-modal__close"';
    await driver.findElement(By.css(locator)).click();
}

async function pressFilterButton(driver) {
    const locator = 'filter-toggle';

    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await driver.findElement(By.className(locator)).click();
}

async function clickPreOwnTab(driver) {
    const locator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/wb-tabs/wb-tab-bar/wb-tab[1]';

    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await driver.findElement(By.xpath(locator)).click();
    
    await new Promise(resolve => setTimeout(resolve, 12000));
}

async function clickOnColorFilter(driver) {
    const locator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div';
    await driver.findElement(By.xpath(locator)).click();
}

async function selectColorOption(driver) {
    const colorSelectLocator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div/div[2]/div/div/a';
    const colorValueLocator = '/html/body/div[1]/div[1]/main/div[2]/div[1]/div[2]/div[1]/div/div/div[1]/div[5]/div[7]/div/div[2]/div/div/ul/li[2]/a';
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await driver.findElement(By.xpath(colorSelectLocator)).click();
    await driver.findElement(By.xpath(colorValueLocator)).click();
}

async function closeFilterModal(driver) {
    const locator = '//*[@id="app"]/div[1]/main/div[2]/div[1]/div[2]/div[1]/span/span';
    await driver.findElement(By.xpath(locator)).click();
}

async function selectFilterOption(driver, value) {
    const locator = '/html/body/div/div[1]/main/div[2]/div[1]/div[2]/div[2]/div[2]/wb-select-control/wb-select/select';
    
    const selectElement = await driver.findElement(By.xpath(locator));
    const select = new Select(selectElement);

    await select.selectByValue(value);
}

async function clickOnFirstResult(driver, value) {
    const locator = 'dcp-cars-srp-results__tile';
    await driver.findElement(By.className(locator)).click();
}

async function clickOnEnquireNow(driver) {
    const locator = '[data-test-id="dcp-buy-box__contact-seller"]';
    await driver.findElement(By.css(locator)).click();
}

async function insertFirstName(driver, firstName) {
    const locator = '//div[@data-test-id="rfq-contact__first-name"]//input';
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await driver.findElement(By.xpath(locator)).sendKeys(firstName);
}

async function insertLastName(driver, lastName) {
    const locator = '//div[@data-test-id="rfq-contact__last-name"]//input';
    await driver.findElement(By.xpath(locator)).sendKeys(lastName);
}

async function insertEmail(driver, email) {
    const locator = '//div[@data-test-id="rfq-contact__email"]//input';
    await driver.findElement(By.xpath(locator)).sendKeys(email);
}

async function insertPhoneNumber(driver, phoneNumber) {
    const locator = '//div[@data-test-id="rfq-contact__phone"]//input';
    await driver.findElement(By.xpath(locator)).sendKeys(phoneNumber);
}

async function insertPostalCode(driver, postalCode) {
    const locator = '//div[@data-test-id="rfq-contact__postal-code"]//input';
    await driver.findElement(By.xpath(locator)).sendKeys(postalCode);
}

async function clickOnProceedButton(driver) {
    const locator = '[data-test-id="dcp-rfq-contact-button-container__button-next"';
    await driver.findElement(By.css(locator)).click();
}



module.exports = {
    pressAcceptAllCookiesButton,
    selectStateOption,
    insertLocationPostalCode,
    pressPrivateRadioButton,
    pressModalCloseButton,
    pressFilterButton,
    clickPreOwnTab,
    clickOnColorFilter,
    selectColorOption,
    closeFilterModal,
    selectFilterOption,
    clickOnFirstResult,
    clickOnEnquireNow,
    insertFirstName,
    insertLastName,
    insertEmail,
    insertPhoneNumber,
    insertPostalCode,
    clickOnProceedButton
};