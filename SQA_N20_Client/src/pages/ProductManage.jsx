import { Button, Col, Input, Modal, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import productServices from '../api/services/productServices'
import ProductItem from '../components/ProductItem'

const ProductManage = () => {
    const [products, setProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const handleSearch = async () => {
        const res = await productServices.searchProduct(searchValue)
        setProducts(res)
    }
    const handleCancelSearch = async () => {
        setSearchValue('')
        const res = await productServices.searchProduct('')
        setProducts(res)
    }

    useEffect(() => {
        const getProducts = async () => {
            const res = await productServices.getProducts()
            setProducts(res)
        }
        getProducts()
    }, [])

    return (
        <>
            <Container>
                <StyledDiv>
                    <Typography.Title level={4}>Quản lý mặt hàng</Typography.Title>
                    <Space.Compact
                        style={{
                            width: 600,
                            margin: 16,
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <Input
                            defaultValue=""
                            placeholder="Nhập mã sản phẩm hoặc tên sản phẩm cần tìm"
                            style={{
                                height: 40,
                            }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button
                            type="primary"
                            style={{
                                height: 40,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                            }}
                            onClick={handleSearch}
                        >
                            Tìm kiếm
                        </Button>
                        <ButtonClear onClick={handleCancelSearch}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </ButtonClear>
                    </Space.Compact>
                    <Button type="primary" size="large" onClick={() => navigate('/product/create')}>
                        Thêm mặt hàng
                    </Button>
                </StyledDiv>
                <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #ccc' }}>
                    <Row
                        style={{
                            backgroundColor: '#DAEAF1',
                            height: 44,
                            width: 1200,
                            borderTopLeftRadius: 6,
                            borderTopRightRadius: 6,
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        <Col className="center" span={2}>
                            <Typography.Title level={5}>Mã sản phẩm</Typography.Title>
                        </Col>
                        <Col className="center" span={6}>
                            <Typography.Title level={5}>Tên sản phẩm</Typography.Title>
                        </Col>
                        <Col className="center" span={3}>
                            <Typography.Title level={5}>Tác giả</Typography.Title>
                        </Col>
                        <Col className="center" span={3}>
                            <Typography.Title level={5}>Nhà xuất bản</Typography.Title>
                        </Col>
                        <Col className="center" span={3}>
                            <Typography.Title level={5}>Năm xuất bản</Typography.Title>
                        </Col>
                        <Col className="center" span={2}>
                            <Typography.Title level={5}>Thể loại</Typography.Title>
                        </Col>
                        <Col className="center" span={2}>
                            <Typography.Title level={5}>Số trang</Typography.Title>
                        </Col>
                        <Col className="center" span={3}>
                            <Typography.Title level={5}>Giá</Typography.Title>
                        </Col>
                    </Row>
                    {products.map((item, index) => {
                        return <ProductItem data={item} key={index} />
                    })}
                </div>
            </Container>
        </>
    )
}

export default ProductManage

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 1200px;
`

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 32px 0px;
    width: 1200px;
`

export const StyledForm = styled.form`
    text-align: center;
    i {
        padding-right: 8px;
        color: rgba(0, 0, 0, 0.6);
    }
`

export const StyledHeading = styled.div`
    text-align: center;
    color: rgb(77, 76, 125);
    font-size: 28px;
    font-weight: 500;
`

export const InputGroup = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    margin-top: 8px;
`

const ButtonClear = styled.div`
    position: absolute;
    top: 11px;
    right: 96px;
    z-index: 10;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.25s linear;

    &:hover {
        opacity: 0.4;
    }
`
