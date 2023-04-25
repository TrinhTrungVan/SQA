import { Button, Input, Modal, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import productServices from '../api/services/productServices'
import Loading from '../components/Loading'
import supplierServices from '../api/services/supplierServies'
import { validateSupplierForm } from '../utils/validateForm'

const UpdateSupplier = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const supplierId = location.pathname.split('/')[2]

    const [supplierData, setSupplierData] = useState(null)
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setSupplierData({ ...supplierData, [name]: value })
    }

    const [loading, setLoading] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        setIsModalOpen(false)
        setModalMessage('')
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const error = validateSupplierForm(supplierData)
        if (error) {
            setModalMessage(error)
            setIsModalOpen(true)
            return
        }
        setLoading(true)
        const res = await supplierServices.updateSupplier(supplierId, supplierData)
        setLoading(false)
        if (res.data.status === 'Failed') {
            setModalMessage(res.data.message || 'Đã xảy ra lỗi!')
        } else {
            setModalMessage('Cập nhật thông tin nhà cung cấp thành công!')
        }
        setIsModalOpen(true)
    }

    useEffect(() => {
        const getSupplierDetail = async () => {
            const res = await supplierServices.getSupplierDetail(supplierId)
            console.log(res.data)
            setSupplierData(res.data)
        }
        getSupplierDetail()
    }, [])

    if (!supplierData) return <Loading />
    return (
        <>
            <Container>
                <Typography.Title level={4} style={{ margin: '16px 0' }}>
                    Sửa thông tin nhà cung cấp
                </Typography.Title>
                <StyledForm>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Mã nhà cung cấp (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="supplierCode"
                            value={supplierData.supplierCode}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Tên nhà cung cấp (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="supplierName"
                            value={supplierData.supplierName}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>Địa chỉ</Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="address"
                            value={supplierData.address}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: 'start' }}>
                            Số điện thoại (*)
                        </Typography.Text>
                        <Input
                            className="mt-8"
                            size="large"
                            name="phone"
                            value={supplierData.phone}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <ButtonGroup>
                        <Button key="back" size="large" onClick={() => navigate('/supplier')}>
                            Quay lại
                        </Button>
                        <Button key="back" size="large" type="primary" onClick={handleUpdate}>
                            {loading ? <Loading /> : 'Xác nhận'}
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
                    <Button key="submit" type="primary" onClick={handleOk} style={{ width: 150 }}>
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

export default UpdateSupplier

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
