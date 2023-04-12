import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { convertDate } from "../utils/convertDate";

const PurchaseOrderItem = (props) => {
    const { data } = props;
    const navigate = useNavigate();

    return (
        <StyledDiv onClick={() => navigate(`/purchase-order/${data.id}`)}>
            <Row
                style={{
                    height: 50,
                    width: 1200,
                    paddingTop: 16,
                    borderBottom: "1px solid #ccc",
                }}
            >
                <Col className='center' span={4}>
                    <Typography.Text level={5}>{data?.purchaseCode}</Typography.Text>
                </Col>
                <Col className='center' span={4}>
                    <Typography.Text level={5}>{data?.supplier?.supplierName}</Typography.Text>
                </Col>
                <Col className='center' span={4}>
                    <Typography.Text level={5}>Danh sách sản phẩm</Typography.Text>
                </Col>
                <Col className='center' span={4}>
                    <Typography.Text level={5}>{data?.totalPrice}</Typography.Text>
                </Col>
                <Col className='center' span={4}>
                    <Typography.Text level={5}>{convertDate(data.createdDate)}</Typography.Text>
                </Col>
                <Col className='center' span={4}>
                    <Typography.Text level={5}>{data.note}</Typography.Text>
                </Col>
            </Row>
        </StyledDiv>
    );
};

export default PurchaseOrderItem;

const StyledDiv = styled.div`
    &:hover {
        background-color: #daeaf1;
    }
    transition: background-color 0.25s linear;
`;
