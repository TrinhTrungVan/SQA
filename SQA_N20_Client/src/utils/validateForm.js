export const validateProductForm = (data) => {
    const { productCode, productName, author, publisher, publishing_year, category, pages, price } =
        data
    if (!data) return 'Vui lòng điền đầy đủ các trường.'
    if (
        !productCode ||
        !productName ||
        !author ||
        !publisher ||
        !publishing_year ||
        !category ||
        !pages ||
        !price
    ) {
        return 'Vui lòng điền đầy đủ các trường.'
    }
    if (!isNumber(publishing_year)) return 'Năm xuất bản phải là số'
    if (!isNumber(pages)) return 'Số trang phải là số'
    if (!isNumber(price)) return 'Giá mặt hàng phải là số'
    return ''
}

export const validateSupplierForm = (data) => {
    const { supplierCode, supplierName, address, phone } = data
    if (!data) return 'Vui lòng điền đầy đủ các trường.'
    if (!supplierCode || !supplierName || !address || !phone) {
        return 'Vui lòng điền đầy đủ các trường.'
    }
    if (!isNumber(phone)) return 'Số điện thoại sai định dạng'
    return ''
}

export const isNumber = (str) => {
    const regex = /^\d+$/
    return regex.test(str)
}
