const { By, until } = require("selenium-webdriver")

class Spinner {

    constructor(driver) {
        this.driver = driver
    }

    get spinner() {
        return this.driver.findElement(By.xpath("//div[@class='dcp-loading-spinner']"))
    }

    async waitToBeInvisible() {
        await this.driver.wait(until.elementIsNotVisible(this.spinner))
    }
}

module.exports = { Spinner }