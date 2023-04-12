import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductOption = (props) => {
    const { data } = props;
    const navigate = useNavigate();

    return (
        <StyledDiv onClick={() => {}}>
            <Row
                style={{
                    height: 50,
                    width: 800,
                    paddingTop: 16,
                    borderBottom: "1px solid #ccc",
                }}
            >
                <Col className='center' span={8}>
                    <Typography.Text level={5}>{data.productCode}</Typography.Text>
                </Col>
                <Col className='center' span={8}>
                    <Typography.Text level={5}>{data.productName}</Typography.Text>
                </Col>
                <Col className='center' span={8}>
                    <Typography.Text level={5}>{`${data.price} VNĐ`}</Typography.Text>
                </Col>
            </Row>
        </StyledDiv>
    );
};

export default ProductOption;

const StyledDiv = styled.div`
    &:hover {
        background-color: #daeaf1;
    }
    transition: background-color 0.25s linear;
`;
