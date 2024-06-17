
async function scrollIntoView(driver, element) {
    await driver.executeScript("arguments[0].scrollIntoView(true);", element)
}

module.exports = { scrollIntoView }