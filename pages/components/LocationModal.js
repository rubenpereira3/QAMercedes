const { Select, By } = require('selenium-webdriver')

class LocationModal {

    constructor(driver) {
        this.driver = driver
    }

    get stateSelect() {
        return this.driver.findElement(By.css('.wb-modal-dialog-container > * select'))
    }

    get postalCodeInput() {
        return this.driver.findElement(By.css('[aria-labelledby="postal-code-hint"]'))
    }

    get privateRadioButton() {
        return this.driver.findElement(By.css('input[value="P"] ~ .wb-radio-control__indicator'))
    }
    
    get closeButton() {
        return this.driver.findElement(By.xpath("//*[@data-test-id='state-selected-modal__close' and not(@disabled)]"))
    }
    
    async fill(location) {
        const {state, postalCode} = location

        await this.selectStateValue(state)
        await this.insertPostalCode(postalCode)

        await this.clickPrivateRadioButton()
        await this.clickCloseButton()
    }

    async selectStateValue(state) {
        const select = new Select(await this.stateSelect)
        await select.selectByVisibleText(state)
    }
    
    async insertPostalCode(postalCode) {
       for(const digit of postalCode)
            await this.postalCodeInput.sendKeys(digit)
    }
    
    async clickPrivateRadioButton() {
        await this.privateRadioButton.click()
    }
    
    async clickCloseButton() {        
        await this.closeButton.click()
    }
}

module.exports = { LocationModal }