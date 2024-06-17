const { By } = require("selenium-webdriver")
const { Spinner } = require("./Spinner")
const chai = require("chai")

class AccountCreationForm {

    constructor(driver) {
        this.driver = driver
        this.spinner = new Spinner(driver)
    }

    get firstNameInput() {
        return this.driver.findElement(By.css('[data-test-id="rfq-contact__first-name"] > * input'))
    }

    get lastNameInput() {
        return this.driver.findElement(By.css('[data-test-id="rfq-contact__last-name"] >* input'))
    }
    
    get emailInput() {
        return this.driver.findElement(By.css('[data-test-id="rfq-contact__email"] >* input'))
    }

    get phoneNumberInput() {
        return this.driver.findElement(By.css('[data-test-id="rfq-contact__phone"] > * input'))
    }

    get postalCodeInput() {
        return this.driver.findElement(By.css('[data-test-id="rfq-contact__postal-code"] > * input'))
    }

    get proceedButton() {
        return this.driver.findElement(By.css('[data-test-id="dcp-rfq-contact-button-container__button-next"]'))
    }

    get errorMessage() {
        return this.driver.findElement(By.css('p[class="dcp-error-message__error-hint"]'))
    }

    async fill(contact) {
        const {firstName, lastName, email, phone, postalCode} = contact

        await this.insertFirstName(firstName)
        await this.insertLastName(lastName)
        await this.insertEmail(email)
        await this.insertPhoneNumber(phone)
        await this.insertPostalCode(postalCode)

        await this.clickProceedButton()
    }

    async insertFirstName(firstName) {    
        await this.spinner.waitToBeInvisible()
        await this.firstNameInput.sendKeys(firstName)
    }
    
    async insertLastName(lastName) {
        await this.lastNameInput.sendKeys(lastName)
    }
    
    async insertEmail(email) {
        await this.emailInput.sendKeys(email)
    }
    
    async insertPhoneNumber(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber)
    }
    
    async insertPostalCode(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode)
    }
    
    async clickProceedButton() {
        await this.proceedButton.click()
    }

    async verifyErrorMessage(message) {
        const errorMessageText = await this.errorMessage.getText()
        chai.assert.equal(errorMessageText, message)
    }
}

module.exports = { AccountCreationForm }