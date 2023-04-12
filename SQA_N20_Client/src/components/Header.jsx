import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const items = [
    {
        label: "Quản lý mặt hàng",
        key: "product",
    },
    {
        label: "Quản lý đơn nhập hàng",
        key: "purchase-order",
    },
    {
        label: "Quản lý nhà cung cấp",
        key: "supplier",
    },
];

const Header = () => {
    const [current, setCurrent] = useState("product");
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(`/${e.key}`);
        setCurrent(e.key);
    };

    return (
        <Container>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                style={{ width: "100%" }}
            />
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: "100%";
`;
