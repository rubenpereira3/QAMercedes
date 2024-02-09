const { By, Select, until } = require("selenium-webdriver");

class Showroom {
    constructor(driver) {
        this.driver = driver;
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

        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))));
    }
    
    async clickOnFirstResult(value) {
        const locator = '//div[contains(@class, "dcp-cars-srp-results")]/div[@class="dcp-cars-srp-results__tile"][1]';

        let result = await this.driver.wait(until.elementLocated(By.xpath(locator)), 5000);
        await result.click();
    }
}

module.exports = {
    Showroom
};