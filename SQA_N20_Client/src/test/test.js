const { By, Key, Builder, Browser } = require('selenium-webdriver')
const { suite } = require('selenium-webdriver/testing')
const assert = require('assert')
require('chromedriver')

// const test_case = async () => {
//     const driver = await new Builder().forBrowser('chrome').build()
//     await driver.get('http://localhost:3000/product/create')

//     await driver.findElement(By.name('productCode')).sendKeys('PR001', Key.RETURN)
//     await driver.findElement(By.name('create_product')).click()
//     await driver.manage().setTimeouts({ implicit: 500 })
//     const notity = await driver.findElement(By.name('notify'))
//     const message = await notity.getText()
//     console.log('notify', message)
//     assert.equal(message, 'Vui lòng điền đầy đủ các trường.')
// }

// test_case()
// test_case1()

suite(
    function (env) {
        describe('First script', function () {
            let driver

            before(async function () {
                driver = await new Builder().forBrowser('chrome').build()
            })

            after(async () => await driver.quit())

            it('Kiểm tra thêm mặt hàng', async function () {
                await driver.get('http://localhost:3000/product/create')

                await driver.findElement(By.name('productCode')).sendKeys('PR001', Key.RETURN)
                await driver.findElement(By.name('create_product')).click()
                await driver.manage().setTimeouts({ implicit: 500 })
                const notity = await driver.findElement(By.name('notify'))
                const message = await notity.getText()
                assert.equal(message, 'Vui lòng điền đầy đủ các trường.')
                // await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
                // let title = await driver.getTitle();
                // assert.equal("Web form", title);
                // await driver.manage().setTimeouts({implicit: 500});
                // let textBox = await driver.findElement(By.name('my-text'));
                // let submitButton = await driver.findElement(By.css('button'));
                // await textBox.sendKeys('Selenium');
                // await submitButton.click();
                // let message = await driver.findElement(By.id('message'));
                // let value = await message.getText();
                // assert.equal("Received!", value);
            })
        })
    },
    { browsers: [Browser.CHROME, Browser.FIREFOX] }
)
