const { By } = require("selenium-webdriver")
const { Spinner } = require("./Spinner")
const { scrollIntoView } = require("../../support/ExpectConditionsHelper")

class Filter {

    constructor(driver) {
        this.driver = driver
        this.spinner = new Spinner(driver)
    }
    
    get preOwnTab() {
        return this.driver.findElement(By.xpath("//button[./*[contains(text(), 'Pre-Own')]]"))
    }

    get colourCategory() {
        return this.driver.findElement(By.xpath('//div[@class = "category-filter-row" and .//*[text() = "Colour"]]'))
    }

    get colourSelect() {
        return this.driver.findElement(By.xpath('//*[@data-test-id="multi-select-dropdown-card-opener" and ./span[contains(text(), "Colour")]]'))
    }

    getColourByName(colour) {
        return this.colourCategory.findElement(By.xpath(`//a[contains(text(), "${colour}")]`))
    }

    get closeButton() {
        return this.driver.findElement(By.className('close-button'))
    }

    async selectColourOption(color) {
        await this.clickColourSelect()
        await this.clickColourOption(color)
    }

    async clickPreOwnTab() {
        await this.preOwnTab.click()
    }
    
    async clickColourCategory() {
        await this.spinner.waitToBeInvisible()
        await this.colourCategory.click()
    }

    async clickColourSelect() {
        await this.colourSelect.click()
    }

    async clickColourOption(color) {
        const colourButton = await this.getColourByName(color)
        
        await scrollIntoView(this.driver, colourButton)
        
        await colourButton.click()
    }
      
    async close() {
        await this.spinner.waitToBeInvisible()
        await this.closeButton.click()
    }
}

module.exports = { Filter }