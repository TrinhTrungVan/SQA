import { Input, Typography } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const OrderItem = (props) => {
    const { data, handleUpdateQuantity } = props;
    console.log("OrderItem", data);
    const [quantity, setQuantity] = useState(data.quantity);
    return (
        <StyledDiv>
            <Typography.Text>{data.productCode}</Typography.Text>
            <Typography.Text>{data.productName}</Typography.Text>
            <Typography.Text>{`${data.price} VNĐ`}</Typography.Text>
            <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder='Nhập số lượng'
                style={{ width: 130, textAlign: "center" }}
                size='large'
                onBlur={() => handleUpdateQuantity(data.id, quantity)}
            />
            <Typography.Text>{`${data.price * quantity} VNĐ`}</Typography.Text>
        </StyledDiv>
    );
};

export default OrderItem;

const StyledDiv = styled.div`
    display: flex;
    width: 700px;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    padding: 32px 0px;
    border-top: 1px solid #ccc;
`;
