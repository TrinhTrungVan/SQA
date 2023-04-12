import axiosClient from "../axiosClient";

const purchaseOrderServices = {
    getPurchaseOrders: () => {
        return axiosClient.get("/purchase-orders");
    },
    getPurchaseOrderDetail: (id) => {
        return axiosClient.get(`/purchase-orders/${id}`);
    },
    createPurchaseOrder: (data) => {
        return axiosClient.post("/purchase-orders/create", data);
    },
    updatePurchaseOrder: (id, newData) => {
        return axiosClient.put(`/purchase-orders/${id}`, newData);
    },
    deletePurchaseOrder: (id) => {
        return axiosClient.delete(`/purchase-orders/${id}`);
    },
    searchPurchaseOrder: (name) => {
        return axiosClient.get("/purchase-orders/search", {
            params: {
                name: name,
            },
        });
    },
};

export default purchaseOrderServices;
