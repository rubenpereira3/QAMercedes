const { Builder, Browser } = require("selenium-webdriver");
const { Navigators } = require("../pages/navigators");
const { ScreenChecks } = require("../pages/screenChecks");
const chai = require("chai");
const fileOperations = require("../fileOperations");
const { step } = require("mocha-steps");

describe('Validate the negative path of enquiring the highest price at Mercedes-Benz', function () {   
    const timeoutInMinutes = 30;
    this.timeout(timeoutInMinutes * 60000);
    
    let driver;
    let navigators;
    let screenChecks;

    before(async function() {
        const useEdge = process.argv.includes('--edge');
        const browser = useEdge ? Browser.EDGE : Browser.CHROME;

        driver = await new Builder().forBrowser(browser).build();
        await driver.manage().window().setRect({ width: 1024, height: 900 });

        navigators = new Navigators(driver);
        screenChecks = new ScreenChecks(driver);
    });
    
    step('Open the Mercedes-Benz shop', async function() {
       await driver.get('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
       await screenChecks.checkPageTitle('Search Overview');

       await navigators.pressAcceptAllCookiesButton();
   });
   
    step('Fill location info', async function() {
        await navigators.selectStateOption('New South Wales');
        await navigators.insertLocationPostalCode('2007');
        await navigators.pressPrivateRadioButton();
        await navigators.pressModalCloseButton();
    });

    step('Click the filter button', async function() {
        await navigators.pressFilterButton();
    });

    step('Select a color from Pre-Owned tab', async function() {
        await navigators.clickPreOwnTab();
        
        await navigators.pressFilterButton();
        
        await navigators.clickOnColorFilter();
        await navigators.selectColorOption("Graphite Grey metallic");
        
        await navigators.closeFilterModal();
    });
    
    step('Navigate to the Vehicle Details of the most expensive car', async function() {
        await navigators.selectFilterOption('price-desc-ucos');
        await navigators.clickOnFirstResult();
    });

    step('Save car details to a file', async function() {
        const modelYear = await screenChecks.getModelYear();
        const vin = await screenChecks.getVin();

        fileOperations.saveToFile(`Model Year: ${modelYear}\nVIN: ${vin}`);
    });
    
    step('Click on Enquire Now button', async function() {
        await navigators.clickOnEnquireNow();
    });
    
    step('Fill contact details with invalid email', async function() {
        await navigators.insertFirstName('Vitor');
        await navigators.insertLastName('Antunes');
        await navigators.insertEmail('abc');
        await navigators.insertPhoneNumber('0441234567');
        await navigators.insertPostalCode("2007");
    });
    
    step('Click Proceed and validate the error', async function() {
        await navigators.clickOnProceedButton();
        const error = await screenChecks.getErrorMessage();

        chai.assert.equal(error, 'An error has occurred.\nPlease check the following sections:');
    });

    after(async function() {
        await driver.quit();
    });
});
