import { Button, Input, Modal, Select, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import productServices from "../api/services/productServices";
import Loading from "../components/Loading";
import supplierServices from "../api/services/supplierServies";
import ProductOption from "../components/ProductOption";
import OrderItem from "../components/OrderItem";
import purchaseOrderServices from "../api/services/purchaseOrderServices";

const CreatePurchaseOrder = () => {
    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);

    const [optionsSupplier, setOptionsSupplier] = useState([]);
    const [optionsProduct, setOptionsProduct] = useState([]);

    const [supplier, setSupplier] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [purchaseCode, setPurchaseCode] = useState("");
    const [note, setNote] = useState("");

    const handleAddOrderItem = (e) => {
        const foundProduct = products.filter((item) => item.id === e)[0];
        setOrderItems([...orderItems, { ...foundProduct, quantity: 1 }]);
    };

    const handleUpdateQuantity = (id, quantity) => {
        const foundOrderItem = orderItems.filter((i) => i.id === id)[0];
        foundOrderItem.quantity = quantity;
        console.log("asdad", id, quantity);
    };

    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const handleCreatePurchaseOrder = async () => {
        const handledOrderItems = orderItems.map((item) => {
            return { product: { id: item.id }, quantity: item.quantity };
        });
        const data = {
            supplier: supplier,
            orderItems: handledOrderItems,
            purchaseCode: purchaseCode,
            note: note,
        };
        setLoading(true);
        const res = await purchaseOrderServices.createPurchaseOrder(data);
        setLoading(false);
        if (res.data.status === "Failed") {
            setModalMessage(res.data.message || "Đã xảy ra lỗi!");
        } else {
            setModalMessage("Tạo đơn nhập hàng thành công!");
            setSupplier(null);
            setOrderItems([]);
            setNote("");
            setPurchaseCode("");
        }
        setIsModalOpen(true);
    };

    useEffect(() => {
        const getData = async () => {
            const suppliers = await supplierServices.getSuppliers();
            setSuppliers(suppliers);
            const supplierOptions = suppliers.map((item) => {
                return {
                    value: item.id,
                    label: (
                        <SupplierInfo>
                            <Typography.Text>{item.supplierName}</Typography.Text>
                            <Typography.Text>{item.phone}</Typography.Text>
                        </SupplierInfo>
                    ),
                    key: item.supplierName,
                };
            });
            setOptionsSupplier(supplierOptions);

            const products = await productServices.getProducts();
            setProducts(products);
            const productOptions = products.map((item) => {
                return {
                    value: item.id,
                    label: (
                        <SupplierInfo>
                            <Typography.Text>{item.productCode}</Typography.Text>
                            <Typography.Text>{item.productName}</Typography.Text>
                            <Typography.Text>{`${item.price} VNĐ`}</Typography.Text>
                        </SupplierInfo>
                    ),
                    key: item.supplierName,
                };
            });
            setOptionsProduct(productOptions);
        };
        getData();
    }, []);

    return (
        <>
            <Container>
                <Typography.Title level={4} style={{ margin: "16px 0" }}>
                    Tạo đơn hàng
                </Typography.Title>
                <StyledDiv>
                    <Typography.Title level={5} style={{ margin: 16 }}>
                        Thông tin nhà cung cấp
                    </Typography.Title>
                    <Select
                        showSearch
                        style={{
                            width: 750,
                            margin: 16,
                        }}
                        placeholder='Nhập tên nhà cung cấp'
                        size='large'
                        optionFilterProp='children'
                        filterOption={(input, option) => (option?.key ?? "").includes(input)}
                        options={optionsSupplier}
                        onSelect={(id) => setSupplier({ ...supplier, id: id })}
                    />
                </StyledDiv>
                <StyledDiv>
                    <Typography.Title level={5} style={{ margin: 16 }}>
                        Danh sách sản phẩm
                    </Typography.Title>
                    <Select
                        showSearch
                        style={{
                            width: 750,
                            margin: 16,
                        }}
                        labelInValue={false}
                        placeholder='Nhập tên sản phẩm'
                        size='large'
                        optionFilterProp='children'
                        filterOption={(input, option) => (option?.key ?? "").includes(input)}
                        options={optionsProduct}
                        onSelect={handleAddOrderItem}
                    />
                    <ListOrderItem>
                        <StyledOrderItem>
                            <Typography.Title level={5}>Mã sản phẩm</Typography.Title>
                            <Typography.Title level={5}>Tên sản phẩm</Typography.Title>
                            <Typography.Title level={5}>Đơn giá</Typography.Title>
                            <Typography.Title level={5}>Số lượng</Typography.Title>
                            <Typography.Title level={5}>Tạm tính</Typography.Title>
                        </StyledOrderItem>
                        {orderItems.map((item, index) => {
                            return (
                                <OrderItem
                                    data={item}
                                    handleUpdateQuantity={handleUpdateQuantity}
                                    key={index}
                                />
                            );
                        })}
                    </ListOrderItem>
                </StyledDiv>
                <StyledDiv>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>
                            Mã đơn nhập hàng
                        </Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            value={purchaseCode}
                            onChange={(e) => setPurchaseCode(e.target.value)}
                            style={{ marginTop: 0, width: "100%" }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Typography.Text style={{ textAlign: "start" }}>Ghi chú</Typography.Text>
                        <Input
                            className='mt-8'
                            size='large'
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={{ marginTop: 0, width: "100%" }}
                        />
                    </InputGroup>
                </StyledDiv>
                <ButtonGroup>
                    <Button key='back' size='large' onClick={() => navigate("/purchase-order")}>
                        Quay lại
                    </Button>
                    <Button
                        key='submit'
                        type='primary'
                        size='large'
                        onClick={handleCreatePurchaseOrder}
                    >
                        {loading ? <Loading /> : "Tạo đơn nhập hàng"}
                    </Button>
                </ButtonGroup>
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

export default CreatePurchaseOrder;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 64px;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    margin: 16px 0px;
    width: 800px;
    background-color: white;
    border: solid 1px #ccc;
    border-radius: 8px;
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
    width: 100%;
    padding: 16px;
    justify-content: left;
    flex-direction: column;
    margin-top: 8px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
`;

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
`;

const SupplierInfo = styled.div`
    display: flex;
    width: 700px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    padding-left: 32px;
`;

const ListOrderItem = styled.div`
    width: 100%;
    border-top: 1px solid #ccc;
    padding-top: 8px;
    padding-left: 32px;
`;

const StyledOrderItem = styled.div`
    display: flex;
    width: 700px;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
`;
