import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductItem = (props) => {
    const { data } = props;
    const navigate = useNavigate();

    return (
        <StyledDiv onClick={() => navigate(`/product/${data.id}`)}>
            <Row
                style={{
                    height: 50,
                    width: 1200,
                    paddingTop: 16,
                    borderBottom: "1px solid #ccc",
                }}
            >
                <Col className='center' span={2}>
                    <Typography.Text level={5}>{data.productCode}</Typography.Text>
                </Col>
                <Col className='center' span={6}>
                    <Typography.Text level={5}>{data.productName}</Typography.Text>
                </Col>
                <Col className='center' span={3}>
                    <Typography.Text level={5}>{data.author}</Typography.Text>
                </Col>
                <Col className='center' span={3}>
                    <Typography.Text level={5}>{data.publisher}</Typography.Text>
                </Col>
                <Col className='center' span={3}>
                    <Typography.Text level={5}>{data.publishing_year}</Typography.Text>
                </Col>
                <Col className='center' span={2}>
                    <Typography.Text level={5}>{data.category}</Typography.Text>
                </Col>
                <Col className='center' span={2}>
                    <Typography.Text level={5}>{data.pages}</Typography.Text>
                </Col>
                <Col className='center' span={3}>
                    <Typography.Text level={5}>{`${data.price} VNĐ`}</Typography.Text>
                </Col>
            </Row>
        </StyledDiv>
    );
};

export default ProductItem;

const StyledDiv = styled.div`
    &:hover {
        background-color: #daeaf1;
    }
    transition: background-color 0.25s linear;
`;
