const { step } = require("mocha-steps")
const { ShowroomPage } = require("../pages/ShowroomPage")
const { DetailPage } = require("../pages/DetailPage")
const { Browser, Builder } = require("selenium-webdriver")

const TestData = require("../pages/fixtures/TestData")

describe('Validate the negative path of enquiring the highest price at Mercedes-Benz', function() {   
    const timeoutInMinutes = 30
    this.timeout(timeoutInMinutes * 60000)
    
    let showroomPage
    let detailPage
    let driver

    before(async function() {
        const useEdge = process.argv.includes('--edge')
        const browser = useEdge ? Browser.EDGE : Browser.CHROME

        driver = await new Builder().forBrowser(browser).build()
  
        showroomPage = new ShowroomPage(driver)
        detailPage = new DetailPage(driver)
        
        await driver.manage().setTimeouts({ implicit: 30000 })
        await driver.manage().window().setRect({ x: 0, y: 0, width: 1920, height: 1080 })
    })

    
    step('Open the Mercedes-Benz shop', async function() {
       await showroomPage.visit()
       await showroomPage.cookies.acceptCookies()
    })
   
    step('Fill location info', async function() {
        await showroomPage.locationModal.fill(TestData.location)
    })

    step('Click the filter button', async function() {
        await showroomPage.openFilterMenu()
    })

    step('Select a color from Pre-Owned tab', async function() {
        await showroomPage.filter.clickPreOwnTab()
                
        await showroomPage.filter.clickColourCategory()
        await showroomPage.filter.selectColourOption(TestData.color)
        
        await showroomPage.filter.close()
    })
    
    step('Navigate to the Vehicle Details of the most expensive car', async function() {
        await showroomPage.sort(TestData.sortOption)
        await showroomPage.clickCardByPosition(1)
    })

    step('Click on Enquire Now button', async function() {
        await detailPage.clickEnquireNowButton()
    })
    
    step('Fill contact details with invalid email', async function() {
        await detailPage.form.fill(TestData.contactData)
        await detailPage.form.verifyErrorMessage(TestData.formMessage)
    })
    
    after(async function() {
        await driver.quit()
    })
})