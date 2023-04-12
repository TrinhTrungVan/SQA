import { Button, Input, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import productServices from "../api/services/productServices";
import Loading from "../components/Loading";

const initData = {
    productCode: "",
    productName: "",
    author: "",
    publisher: "",
    publishingYear: "",
    category: "",
    pages: "",
    price: "",
};

const CreateProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState(initData);
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await productServices.createProduct(productData);
        setLoading(false);
        if (res.data.status === "Failed") {
            console.log(res.data);
            setModalMessage(res.data.message || "Đã xảy ra lỗi!");
        } else {
            setModalMessage("Thêm sản phẩm thành công!");
            setProductData(initData);
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <Container>
                <Typography.Title level={4} style={{ margin: "16px 0" }}>
                    Thêm sản phẩm
                </Typography.Title>
                <StyledForm>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Mã sản phẩm
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='productCode'
                            value={productData.productCode}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Tên sản phẩm
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='productName'
                            value={productData.productName}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>Tác giả</Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='author'
                            value={productData.author}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Nhà xuất bản
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='publisher'
                            value={productData.publisher}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Năm xuất bản
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='publishingYear'
                            value={productData.publishingYear}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>Thể loại</Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='category'
                            value={productData.category}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>Số trang</Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='pages'
                            value={productData.pages}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>Giá</Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            name='price'
                            value={productData.price}
                            onChange={handleChangeInput}
                            style={{ marginTop: 0 }}
                            addonAfter={"VNĐ"}
                        />
                    </InputGroup>
                    <ButtonGroup>
                        <Button key='back' size='large' onClick={() => navigate("/product")}>
                            Quay lại
                        </Button>
                        <Button
                            key='submit'
                            type='primary'
                            size='large'
                            onClick={handleCreateProduct}
                        >
                            {loading ? <Loading /> : "Thêm sản phẩm"}
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

export default CreateProduct;

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
