const { By, Key, Builder, Browser } = require('selenium-webdriver')
const { suite } = require('selenium-webdriver/testing')
const assert = require('assert')
require('chromedriver')

suite(
    function (env) {
        describe('First script', function () {
            let driver

            before(async function () {
                driver = await new Builder().forBrowser('chrome').build()
            })

            after(async () => await driver.quit())

            // it('Kiểm tra thêm mặt hàng thành công', async function () {
            //     await driver.get('http://localhost:3000/product/create')

            //     await driver.findElement(By.name('productCode')).sendKeys('SP001', Key.RETURN)
            //     await driver
            //         .findElement(By.name('productName'))
            //         .sendKeys('Nhà giả kim 1', Key.RETURN)
            //     await driver.findElement(By.name('author')).sendKeys('Paulo Coelho', Key.RETURN)
            //     await driver
            //         .findElement(By.name('publisher'))
            //         .sendKeys('Editora Rocco Ltda.', Key.RETURN)
            //     await driver.findElement(By.name('publishing_year')).sendKeys('1988', Key.RETURN)
            //     await driver.findElement(By.name('category')).sendKeys('Phiêu lưu', Key.RETURN)
            //     await driver.findElement(By.name('pages')).sendKeys('225', Key.RETURN)
            //     await driver.findElement(By.name('price')).sendKeys('142000', Key.RETURN)

            //     await driver.findElement(By.name('create_product')).click()
            //     await driver.manage().setTimeouts({ implicit: 500 })
            //     const notity = await driver.findElement(By.name('notify'))
            //     const message = await notity.getText()
            //     assert.equal(message, 'Thêm mặt hàng thành công')
            // })

            // it('Kiểm tra thêm mặt hàng thất bại', async function () {
            //     await driver.get('http://localhost:3000/product/create')

            //     await driver.findElement(By.name('productCode')).sendKeys('SP001', Key.RETURN)
            //     await driver
            //         .findElement(By.name('productName'))
            //         .sendKeys('Nhà giả kim 1', Key.RETURN)
            //     await driver.findElement(By.name('author')).sendKeys('Paulo Coelho', Key.RETURN)
            //     await driver
            //         .findElement(By.name('publisher'))
            //         .sendKeys('Editora Rocco Ltda.', Key.RETURN)
            //     await driver.findElement(By.name('publishing_year')).sendKeys('1988', Key.RETURN)
            //     await driver.findElement(By.name('category')).sendKeys('Phiêu lưu', Key.RETURN)
            //     await driver.findElement(By.name('pages')).sendKeys('225', Key.RETURN)

            //     await driver.findElement(By.name('create_product')).click()
            //     await driver.manage().setTimeouts({ implicit: 500 })
            //     const notity = await driver.findElement(By.name('notify'))
            //     const message = await notity.getText()
            //     assert.equal(message, 'Vui lòng điền đầy đủ các trường.')
            // })

            // it('Kiểm tra thêm mặt hàng thất bại', async function () {
            //     await driver.get('http://localhost:3000/product/create')

            //     await driver.findElement(By.name('productCode')).sendKeys('SP001', Key.RETURN)
            //     await driver
            //         .findElement(By.name('productName'))
            //         .sendKeys('Nhà giả kim 1', Key.RETURN)
            //     await driver.findElement(By.name('author')).sendKeys('Paulo Coelho', Key.RETURN)
            //     await driver
            //         .findElement(By.name('publisher'))
            //         .sendKeys('Editora Rocco Ltda.', Key.RETURN)
            //     await driver.findElement(By.name('publishing_year')).sendKeys('1988', Key.RETURN)
            //     await driver.findElement(By.name('category')).sendKeys('Phiêu lưu', Key.RETURN)
            //     await driver.findElement(By.name('pages')).sendKeys('225', Key.RETURN)
            //     await driver.findElement(By.name('price')).sendKeys('142000', Key.RETURN)

            //     await driver.findElement(By.name('create_product')).click()
            //     await driver.manage().setTimeouts({ implicit: 500 })
            //     const notity = await driver.findElement(By.name('notify'))
            //     const message = await notity.getText()
            //     assert.equal(message, 'Mã sản phẩm đã tồn tại!')
            // })

            // it('Kiểm tra thêm mặt hàng thất bại', async function () {
            //     await driver.get('http://localhost:3000/product/create')

            //     await driver.findElement(By.name('productCode')).sendKeys('SP001', Key.RETURN)
            //     await driver
            //         .findElement(By.name('productName'))
            //         .sendKeys('Nhà giả kim 1', Key.RETURN)
            //     await driver.findElement(By.name('author')).sendKeys('Paulo Coelho', Key.RETURN)
            //     await driver
            //         .findElement(By.name('publisher'))
            //         .sendKeys('Editora Rocco Ltda.', Key.RETURN)
            //     await driver.findElement(By.name('publishing_year')).sendKeys('1988', Key.RETURN)
            //     await driver.findElement(By.name('category')).sendKeys('Phiêu lưu', Key.RETURN)
            //     await driver.findElement(By.name('pages')).sendKeys('225', Key.RETURN)
            //     await driver.findElement(By.name('price')).sendKeys('abc', Key.RETURN)

            //     await driver.findElement(By.name('create_product')).click()
            //     await driver.manage().setTimeouts({ implicit: 500 })
            //     const notity = await driver.findElement(By.name('notify'))
            //     const message = await notity.getText()
            //     assert.equal(message, 'Giá mặt hàng phải là số')
            // })

            it('Kiểm tra thêm nhà cung cấp thành công', async function () {
                await driver.get('http://localhost:3000/supplier/create')

                await driver.findElement(By.name('supplierCode')).sendKeys('SU001', Key.RETURN)
                await driver.findElement(By.name('supplierName')).sendKeys('TrungVan', Key.RETURN)
                await driver.findElement(By.name('address')).sendKeys('HaNoi', Key.RETURN)
                await driver.findElement(By.name('phone')).sendKeys('0338886754', Key.RETURN)

                await driver.findElement(By.name('create_supplier')).click()
                await driver.manage().setTimeouts({ implicit: 500 })
                const notity = await driver.findElement(By.name('notify'))
                const message = await notity.getText()
                assert.equal(message, 'Thêm nhà cung cấp thành công')
            })

            it('Kiểm tra thêm nhà cung cấp thất bại', async function () {
                await driver.get('http://localhost:3000/supplier/create')

                await driver.findElement(By.name('supplierCode')).sendKeys('SU001', Key.RETURN)
                await driver.findElement(By.name('supplierName')).sendKeys('TrungVan', Key.RETURN)
                await driver.findElement(By.name('address')).sendKeys('HaNoi', Key.RETURN)
                await driver.findElement(By.name('phone')).sendKeys('0338886754', Key.RETURN)

                await driver.findElement(By.name('create_supplier')).click()
                await driver.manage().setTimeouts({ implicit: 500 })
                const notity = await driver.findElement(By.name('notify'))
                const message = await notity.getText()
                assert.equal(message, 'Mã nhà cung cấp đã tồn tại')
            })

            it('Kiểm tra thêm nhà cung cấp thất bại', async function () {
                await driver.get('http://localhost:3000/supplier/create')

                await driver.findElement(By.name('supplierCode')).sendKeys('SU001', Key.RETURN)
                await driver.findElement(By.name('address')).sendKeys('HaNoi', Key.RETURN)
                await driver.findElement(By.name('phone')).sendKeys('0338886754', Key.RETURN)

                await driver.findElement(By.name('create_supplier')).click()
                await driver.manage().setTimeouts({ implicit: 500 })
                const notity = await driver.findElement(By.name('notify'))
                const message = await notity.getText()
                assert.equal(message, 'Vui lòng điền đầy đủ các trường.')
            })

            it('Kiểm tra thêm nhà cung cấp thất bại', async function () {
                await driver.get('http://localhost:3000/supplier/create')

                await driver.findElement(By.name('supplierCode')).sendKeys('SU001', Key.RETURN)
                await driver.findElement(By.name('supplierName')).sendKeys('TrungVan', Key.RETURN)
                await driver.findElement(By.name('address')).sendKeys('HaNoi', Key.RETURN)
                await driver.findElement(By.name('phone')).sendKeys('abc', Key.RETURN)

                await driver.findElement(By.name('create_supplier')).click()
                await driver.manage().setTimeouts({ implicit: 500 })
                const notity = await driver.findElement(By.name('notify'))
                const message = await notity.getText()
                assert.equal(message, 'Số điện thoại sai định dạng')
            })
        })
    },
    { browsers: [Browser.CHROME, Browser.FIREFOX] }
)
