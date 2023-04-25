import { Button, Col, Input, Modal, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import productServices from '../api/services/productServices'
import Loading from '../components/Loading'

const ProductDetail = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const productId = location.pathname.split('/')[2]

    const [productData, setProductData] = useState(null)

    const [loading, setLoading] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [deleteSuccesss, setDeleteSuccesss] = useState(false)
    const handleDelete = async () => {
        setIsModalConfirmOpen(false)
        setLoading(true)
        const res = await productServices.deleteProduct(productId)
        setLoading(false)
        console.log('Res', res)
        if (res.data.status === 'Failed') {
            setModalMessage(res.data.message || 'Đã xảy ra lỗi!')
            setDeleteSuccesss(false)
        } else {
            setModalMessage('Xoá mặt hàng thành công!')
            setDeleteSuccesss(true)
        }
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOpenModalConfirm = () => {
        setModalMessage('')
        setIsModalConfirmOpen(true)
    }

    const handleDeleteSuccess = () => {
        setIsModalOpen(false)
        if (deleteSuccesss) {
            navigate('/product')
        }
    }

    useEffect(() => {
        const getProductDetail = async () => {
            const res = await productServices.getProductDetail(productId)
            setProductData(res.data)
        }
        getProductDetail()
    }, [])

    if (!productData) return <Loading />
    return (
        <>
            <Container>
                <Typography.Title level={4} style={{ margin: '16px 0' }}>
                    Thông tin mặt hàng
                </Typography.Title>
                <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #ccc' }}>
                    <Row
                        style={{
                            width: 600,
                            borderTopLeftRadius: 6,
                            borderTopRightRadius: 6,
                            borderBottom: '1px solid #ccc',
                            paddingTop: 32,
                        }}
                    >
                        <Col
                            className="center"
                            span={12}
                            style={{ textAlign: 'start', paddingLeft: 48 }}
                        >
                            <Typography.Title level={5}>Mã mặt hàng</Typography.Title>
                            <Typography.Title level={5}>Tên mặt hàng</Typography.Title>
                            <Typography.Title level={5}>Tác giả</Typography.Title>
                            <Typography.Title level={5}>Nhà xuất bản</Typography.Title>
                            <Typography.Title level={5}>Năm xuất bản</Typography.Title>
                            <Typography.Title level={5}>Thể loại</Typography.Title>
                            <Typography.Title level={5}>Số trang</Typography.Title>
                            <Typography.Title level={5}>Giá</Typography.Title>
                        </Col>
                        <Col className="center" span={12}>
                            <StyledInfo>{productData.productCode}</StyledInfo>
                            <StyledInfo>{productData.productName}</StyledInfo>
                            <StyledInfo>{productData.author}</StyledInfo>
                            <StyledInfo>{productData.publisher}</StyledInfo>
                            <StyledInfo>{productData.publishing_year}</StyledInfo>
                            <StyledInfo>{productData.category}</StyledInfo>
                            <StyledInfo>{productData.pages}</StyledInfo>
                            <StyledInfo>{`${productData.price} VNĐ`}</StyledInfo>
                        </Col>
                    </Row>
                    <ButtonGroup>
                        <Button key="back" size="large" onClick={() => navigate('/product')}>
                            Quay lại
                        </Button>
                        <Button
                            key="back"
                            size="large"
                            type="primary"
                            onClick={() => navigate(`/product/${productId}/update`)}
                        >
                            Sửa thông tin
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            danger
                            size="large"
                            onClick={handleOpenModalConfirm}
                        >
                            Xoá mặt hàng
                        </Button>
                    </ButtonGroup>
                </div>
            </Container>
            <Modal
                title="Xác nhận xoá?"
                open={isModalConfirmOpen}
                onOk={handleDelete}
                closable={false}
                footer={[
                    <Button
                        key="submit"
                        onClick={() => setIsModalConfirmOpen(false)}
                        size="large"
                        style={{ width: 150 }}
                    >
                        Huỷ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        danger
                        size="large"
                        onClick={handleDelete}
                        style={{ width: 150 }}
                    >
                        {loading ? <Loading /> : 'Xoá mặt hàng'}
                    </Button>,
                ]}
                style={{ display: 'flex', justifyContent: 'center', width: 500 }}
            >
                <Typography.Text>{modalMessage}</Typography.Text>
            </Modal>
            <Modal
                title="Thông báo"
                open={isModalOpen}
                onOk={handleDeleteSuccess}
                closable={false}
                footer={
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleDeleteSuccess}
                        style={{ width: 150 }}
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

export default ProductDetail

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
    padding: 16px;
`

const StyledInfo = styled.div`
    height: 44px;
    text-align: left;
`
