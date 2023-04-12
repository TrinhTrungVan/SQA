import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductManage from "../pages/ProductManage";
import OrderManage from "../pages/OrderManage";
import SupplierManager from "../pages/SupplierManager";
import CreateProduct from "../pages/CreateProduct";
import ProductDetail from "../pages/ProductDetail";
import UpdateProduct from "../pages/UpdateProduct";
import SupplierDetail from "../pages/SupplierDetail";
import UpdateSupplier from "../pages/UpdateSupplier";
import CreateSupplier from "../pages/CreateSupplier";
import PurchaseOrderDetail from "../pages/PurchaseOrderDetail";
import CreatePurchaseOrder from "../pages/CreatePurchaseOrder";

const Switch = () => {
    return (
        <Routes>
            <Route path='/product/create' exact element={<CreateProduct />} />
            <Route path='/product/:id/update' exact element={<UpdateProduct />} />
            <Route path='/product/:id' exact element={<ProductDetail />} />
            <Route path='/product' exact element={<ProductManage />} />
            <Route path='/purchase-order/create' exact element={<CreatePurchaseOrder />} />
            <Route path='/purchase-order/:id' exact element={<PurchaseOrderDetail />} />
            <Route path='/purchase-order' exact element={<OrderManage />} />
            <Route path='/supplier/create' exact element={<CreateSupplier />} />
            <Route path='/supplier/:id/update' exact element={<UpdateSupplier />} />
            <Route path='/supplier/:id' exact element={<SupplierDetail />} />
            <Route path='/supplier' exact element={<SupplierManager />} />
        </Routes>
    );
};

export default Switch;
