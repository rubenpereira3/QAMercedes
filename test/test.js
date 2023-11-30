const { Builder, until, By, Select } = require("selenium-webdriver");
const { elementIsVisible } = require("selenium-webdriver/lib/until");
const navigators = require("../pages/navigators");
const screenChecks = require("../pages/screenChecks");

describe('Array', async function () {
    const timeoutInMinutes = 30;
    this.timeout(timeoutInMinutes * 60000);
    
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        //await driver.manage().window().maximize();
    });
    
    it('Open the Mercedes-Benz shop', async function() {
       await driver.get('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
       await screenChecks.checkPageTitle(driver, 'Search Overview');
       
       await new Promise(resolve => setTimeout(resolve, 4000));

       await navigators.pressAcceptAllCookiesButton(driver);

   });
   
    it('Fill location info', async function() {
        await navigators.selectStateOption(driver, 'New South Wales');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await navigators.insertPostalCode(driver, '2007');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await navigators.pressPrivateRadioButton(driver);
        await navigators.pressModalCloseButton(driver);
        await new Promise(resolve => setTimeout(resolve, 7000));
    });

    it('Click the filter button', async function() {
        await navigators.pressFilterButton(driver);
        await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it('Select a color from Pre-Owned tab', async function() {
        await navigators.clickPreOwnTab(driver);
        await new Promise(resolve => setTimeout(resolve, 12000));
        
        await navigators.pressFilterButton(driver);
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        await navigators.clickOnColorFilter(driver);
        await new Promise(resolve => setTimeout(resolve, 1000));

        await navigators.selectColorOption(driver);
        await navigators.closeFilterModal(driver);

        await new Promise(resolve => setTimeout(resolve, 10000));
    });

    it('Navigate to the Vehicle Details of the most expensive car', async function() {

    });

    after(async function() {
        await driver.quit();
    });
});
