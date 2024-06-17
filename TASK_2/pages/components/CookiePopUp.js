const { By } = require("selenium-webdriver")
const { Spinner } = require("./Spinner")

class CookiePopUp {
    
    constructor(driver) {
        this.driver = driver
        this.spinner = new Spinner(driver)
    }
    
    get acceptButton() {
        return By.css('[data-test="handle-accept-all-button"]')
    }

    get shadowRoot() {
        return By.css('cmm-cookie-banner')
    }

    async acceptCookies() {   
        await this.spinner.waitToBeInvisible()
        
        const shadowRoot = await this.driver.findElement(this.shadowRoot).getShadowRoot()

        const acceptButton = await shadowRoot.findElement(this.acceptButton)
    
        await acceptButton.click()
    }
}

module.exports = { CookiePopUp }