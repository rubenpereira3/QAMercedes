const { By } = require("selenium-webdriver")
const { AccountCreationForm } = require("./components/AccountCreationForm")

class DetailPage {

    constructor(driver) {
        this.driver = driver
        this._form = new AccountCreationForm(driver)
    }

    get enquireNowButton() {
        return this.driver.findElement(By.css('[data-test-id="dcp-buy-box__contact-seller"]'))
    }

    get form() {
        return this._form
    }

    async clickEnquireNowButton() {
        await this.enquireNowButton.click()
    }
} 

module.exports = { DetailPage }