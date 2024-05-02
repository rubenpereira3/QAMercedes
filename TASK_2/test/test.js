const { Builder, Browser } = require("selenium-webdriver");
const { CookiePopUp } = require("../pages/common/cookiePopUp");
const { LocationModal } = require("../pages/common/locationModal");
const { Showroom } = require("../pages/showroom");
const { DetailPage } = require("../pages/detailPage"); 
const chai = require("chai");
const fileOperations = require("../fileOperations");
const { step } = require("mocha-steps");
const chrome = require('selenium-webdriver/chrome');
let fs = require('fs');

describe('Validate the negative path of enquiring the highest price at Mercedes-Benz', function () {   
    const timeoutInMinutes = 30;
    this.timeout(timeoutInMinutes * 60000);
    
    let driver;
    let cookiePopUp = new CookiePopUp();
    let locationModal = new LocationModal();
    let showroom = new Showroom();
    let detailPage = new DetailPage();

    before(async function() {
        const useEdge = process.argv.includes('--edge');
        const browser = useEdge ? Browser.EDGE : Browser.CHROME;

        driver = await new Builder().forBrowser(browser).build();
        await driver.manage().window().setRect({ width: 1024, height: 900 });

        cookiePopUp.driver = driver;
        locationModal.driver = driver;
        showroom.driver = driver;
        detailPage.driver = driver;
    });
    
    step('Open the Mercedes-Benz shop', async function() {
       await driver.get('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
       await cookiePopUp.checkPageTitle('Search Overview');

       await cookiePopUp.pressAcceptAllButton();
   });
   
    step('Fill location info', async function() {
        await locationModal.selectStateOption('New South Wales');
        await locationModal.insertLocationPostalCode('2007');
        await locationModal.pressPrivateRadioButton();
        await locationModal.pressCloseButton();
    });

    step('Click the filter button', async function() {
        await showroom.pressFilterButton();
    });

    step('Select a color from Pre-Owned tab', async function() {
        await showroom.clickPreOwnTab();
        
        await showroom.pressFilterButton();
        
        await showroom.clickOnColorFilter();
        await showroom.selectColorOption("Graphite Grey metallic");
        
        await showroom.closeFilterModal();
    });
    
    step('Navigate to the Vehicle Details of the most expensive car', async function() {
        await showroom.selectFilterOption('price-desc-ucos');
        await showroom.clickOnFirstResult();
    });

    step('Save car details to a file', async function() {
        const modelYear = await detailPage.getModelYear();
        const vin = await detailPage.getVin();

        fileOperations.saveToFile(`Model Year: ${modelYear}\nVIN: ${vin}`);
    });
    
    step('Click on Enquire Now button', async function() {
        await detailPage.clickOnEnquireNow();
    });
    
    step('Fill contact details with invalid email', async function() {
        await detailPage.insertFirstName('Vitor');
        await detailPage.insertLastName('Antunes');
        await detailPage.insertEmail('abc');
        await detailPage.insertPhoneNumber('0441234567');
        await detailPage.insertPostalCode("2007");
    });
    
    step('Click Proceed and validate the error', async function() {
        await detailPage.clickOnProceedButton();
        const error = await detailPage.getErrorMessage();

        chai.assert.equal(error, 'An error has occurred.\nPlease check the following sections:');
    });

    after(async function() {
        await driver.quit();
    });
});
