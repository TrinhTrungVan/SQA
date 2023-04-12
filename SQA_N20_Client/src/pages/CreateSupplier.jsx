import { Button, Input, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import productServices from "../api/services/productServices";
import Loading from "../components/Loading";
import supplierServices from "../api/services/supplierServies";

const initData = {
    supplierCode: "",
    supplierName: "",
    address: "",
    phone: "",
};

const CreateSupplier = () => {
    const navigate = useNavigate();
    const [supplierData, setSupplierData] = useState(initData);
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setSupplierData({ ...supplierData, [name]: value });
    };

    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const handleCreateSupplier = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await supplierServices.createSupplier(supplierData);
        setLoading(false);
        if (res.data.status === "Failed") {
            console.log(res.data);
            setModalMessage(res.data.message || "Đã xảy ra lỗi!");
        } else {
            setModalMessage("Thêm nhà cung cấp thành công!");
            setSupplierData(initData);
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <Container>
                <Typography.Title level={4} style={{ margin: "16px 0" }}>
                    Thêm nhà cung cấp
                </Typography.Title>
                <StyledForm>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Mã nhà cung cấp
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='supplierCode'
                            value={supplierData.supplierCode}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Tên nhà cung cấp
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='supplierName'
                            value={supplierData.supplierName}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>Địa chỉ</Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='address'
                            value={supplierData.address}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Số điện thoại
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='phone'
                            value={supplierData.phone}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <ButtonGroup>
                        <Button key='back' size='large' onClick={() => navigate("/supplier")}>
                            Quay lại
                        </Button>
                        <Button
                            key='submit'
                            type='primary'
                            size='large'
                            onClick={handleCreateSupplier}
                        >
                            {loading ? <Loading /> : "Thêm nhà cung cấp"}
                        </Button>
                    </ButtonGroup>
                </StyledForm>
            </Container>
            <Modal
                title='Thông báo'
                open={isModalOpen}
                onOk={handleOk}
                closable={false}
                footer={
                    <Button key='submit' type='primary' onClick={handleOk} style={{ width: 150 }}>
                        OK
                    </Button>
                }
                style={{ display: "flex", justifyContent: "center", width: 500 }}
            >
                <Typography.Text>{modalMessage}</Typography.Text>
            </Modal>
        </>
    );
};

export default CreateSupplier;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 32px 0px;
    width: 1200px;
`;

export const StyledForm = styled.form`
    width: 400px;
    text-align: center;
    i {
        padding-right: 8px;
        color: rgba(0, 0, 0, 0.6);
    }
`;

export const InputGroup = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    margin-top: 8px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    width: "100%";
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
`;
