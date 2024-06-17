const { By, Select } = require("selenium-webdriver")
const { Spinner } = require("./components/Spinner")
const { CookiePopUp } = require("./components/CookiePopUp")
const { LocationModal } = require("./components/LocationModal")
const { Filter } = require("./components/Filter")

class ShowroomPage {

    constructor(driver) {
        this.driver = driver
        this.cookies = new CookiePopUp(driver)
        this.locationModal = new LocationModal(driver)
        this.filter = new Filter(driver)
        this.spinner = new Spinner(driver)
    }

    get filterButton() {
        return this.driver.findElement(By.xpath("//*[@class='filter-toggle'  and .//*[@class='close-button hide']]"))
    }

    get sortingSelect() {
        return this.driver.findElement(By.css('#srp-result >* select'))
    }

    getCardByPosition(position) {
        return this.driver.findElement(By.xpath(`//div[contains(@class, "dcp-cars-srp-results")]/div[@class="dcp-cars-srp-results__tile"][${position}]`))
    }

    async visit() {
        await this.driver.get('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo')
    }
    
    async openFilterMenu() {
        await this.filterButton.click()
    }

    async sort(option) {
        const select = new Select(await this.sortingSelect)
        await select.selectByVisibleText(option)
    }
    
    async clickCardByPosition(position) {
        await this.spinner.waitToBeInvisible()
        await this.getCardByPosition(position).click()
    }
}

module.exports = { ShowroomPage }