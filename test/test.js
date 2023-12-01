const { Builder } = require("selenium-webdriver");
const navigators = require("../pages/navigators");
const screenChecks = require("../pages/screenChecks");
const chai = require("chai");
const fileOperations = require("../fileOperations");

describe('Validate the negative path of enquiring the highest price at Mercedes-Benz', function () {
    const timeoutInMinutes = 30;
    this.timeout(timeoutInMinutes * 60000);
    
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    it('Open the Mercedes-Benz shop', async function() {
       await driver.get('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
       await screenChecks.checkPageTitle(driver, 'Search Overview');

       await navigators.pressAcceptAllCookiesButton(driver);
   });
   
    it('Fill location info', async function() {
        await navigators.selectStateOption(driver, 'New South Wales');
        await navigators.insertLocationPostalCode(driver, '2007');
        await navigators.pressPrivateRadioButton(driver);
        await navigators.pressModalCloseButton(driver);
    });

    it('Click the filter button', async function() {
        await navigators.pressFilterButton(driver);
    });

    it('Select a color from Pre-Owned tab', async function() {
        await navigators.clickPreOwnTab(driver);
        
        await navigators.pressFilterButton(driver);
        
        await navigators.clickOnColorFilter(driver);
        await navigators.selectColorOption(driver);
        
        await navigators.closeFilterModal(driver);
    });
    
    it('Navigate to the Vehicle Details of the most expensive car', async function() {
        await navigators.selectFilterOption(driver, 'price-desc-ucos');
        await navigators.clickOnFirstResult(driver);
    });

    it('Save car details to a file', async function() {
        const modelYear = await screenChecks.getModelYear(driver);
        const vin = await screenChecks.getVin(driver);

        fileOperations.saveToFile(`Model Year: ${modelYear}\nVIN: ${vin}`);
    });
    
    it('Click on Enquire Now button', async function() {
        await navigators.clickOnEnquireNow(driver);
    });
    
    it('Fill contact details with invalid email', async function() {
        await navigators.insertFirstName(driver, 'Vitor');
        await navigators.insertLastName(driver, 'Antunes');
        await navigators.insertEmail(driver, 'abc');
        await navigators.insertPhoneNumber(driver, '0441234567');
        await navigators.insertPostalCode(driver, "2007");
    });
    
    it('Click Proceed and validate the error', async function() {
        await navigators.clickOnProceedButton(driver);
        const error = await screenChecks.getErrorMessage(driver);

        chai.assert.equal(error, 'An error has occurred.\nPlease check the following sections:');
    });

    after(async function() {
        await driver.quit();
    });
});
