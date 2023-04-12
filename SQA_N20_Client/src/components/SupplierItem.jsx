import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SupplierItem = (props) => {
    const { data } = props;
    const navigate = useNavigate();

    return (
        <StyledDiv onClick={() => navigate(`/supplier/${data.id}`)}>
            <Row
                style={{
                    height: 50,
                    width: 1200,
                    paddingTop: 16,
                    borderBottom: "1px solid #ccc",
                }}
            >
                <Col className='center' span={6}>
                    <Typography.Text level={5}>{data.supplierCode}</Typography.Text>
                </Col>
                <Col className='center' span={6}>
                    <Typography.Text level={5}>{data.supplierName}</Typography.Text>
                </Col>
                <Col className='center' span={6}>
                    <Typography.Text level={5}>{data.address}</Typography.Text>
                </Col>
                <Col className='center' span={6}>
                    <Typography.Text level={5}>{data.phone}</Typography.Text>
                </Col>
            </Row>
        </StyledDiv>
    );
};

export default SupplierItem;

const StyledDiv = styled.div`
    &:hover {
        background-color: #daeaf1;
    }
    transition: background-color 0.25s linear;
`;
