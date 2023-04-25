import { Button, Input, Modal, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import productServices from '../api/services/productServices'
import Loading from '../components/Loading'
import { validateProductForm } from '../utils/validateForm'

const initData = {
    productCode: '',
    productName: '',
    author: '',
    publisher: '',
    publishing_year: '',
    category: '',
    pages: '',
    price: '',
}

const CreateProduct = () => {
    const navigate = useNavigate()
    const [productData, setProductData] = useState(initData)
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const [loading, setLoading] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        setIsModalOpen(false)
        setModalMessage('')
        navigate('/product')
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault()
        const error = validateProductForm(productData)
        if (error) {
            setModalMessage(error)
            setIsModalOpen(true)
            return
        }
        setLoading(true)
        const res = await productServices.createProduct(productData)
        setLoading(false)
        if (res.data.status === 'Failed') {
            console.log(res.data)
            setModalMessage(res.data.message || 'Đã xảy ra lỗi!')
        } else {
            setModalMessage('Thêm mặt hàng thành công!')
            setProductData(initData)
        }
        setIsModalOpen(true)
    }

    return (
        <>
            <Container>
                <Typography.Title level={4} style={{ margin: '16px 0' }}>
                    Thêm mặt hàng
                </Typography.Title>
                <StyledForm>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Mã mặt hàng (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="productCode"
                            value={productData.productCode}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Tên mặt hàng (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="productName"
                            value={productData.productName}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Tác giả (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="author"
                            value={productData.author}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Nhà xuất bản (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="publisher"
                            value={productData.publisher}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Năm xuất bản (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="publishing_year"
                            value={productData.publishing_year}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Thể loại (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="category"
                            value={productData.category}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Số trang (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="pages"
                            value={productData.pages}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>Giá (*)</Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="price"
                            value={productData.price}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                            addonAfter={'VNĐ'}
                        />
                    </InputGroup>
                    <Typography.Text name="notify" type="danger">
                        {modalMessage}
                    </Typography.Text>
                    <ButtonGroup>
                        <Button key="back" size="large" onClick={() => navigate('/product')}>
                            Quay lại
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            size="large"
                            name="create_product"
                            onClick={handleCreateProduct}
                        >
                            {loading ? <Loading /> : 'Thêm mặt hàng'}
                        </Button>
                    </ButtonGroup>
                </StyledForm>
            </Container>
            <Modal
                title="Thông báo"
                open={isModalOpen}
                onOk={handleOk}
                closable={false}
                footer={
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleOk}
                        style={{ width: 150, alignItems: 'center' }}
                    >
                        OK
                    </Button>
                }
                style={{ display: 'flex', justifyContent: 'center', width: 500 }}
            >
                <Typography.Text>{modalMessage}</Typography.Text>
            </Modal>
        </>
    )
}

export default CreateProduct

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 32px 0px;
    width: 1200px;
`

export const StyledForm = styled.form`
    width: 400px;
    text-align: center;
    i {
        padding-right: 8px;
        color: rgba(0, 0, 0, 0.6);
    }
`

export const InputGroup = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    margin-top: 8px;
`

export const ButtonGroup = styled.div`
    display: flex;
    width: '100%';
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
`
