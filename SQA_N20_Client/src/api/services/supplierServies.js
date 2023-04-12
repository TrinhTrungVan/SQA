import axiosClient from "../axiosClient";

const supplierServices = {
    getSuppliers: () => {
        return axiosClient.get("/suppliers");
    },
    getSupplierDetail: (id) => {
        return axiosClient.get(`/suppliers/${id}`);
    },
    createSupplier: (data) => {
        return axiosClient.post("/suppliers/create", data);
    },
    updateSupplier: (id, newData) => {
        return axiosClient.put(`/suppliers/${id}`, newData);
    },
    deleteSupplier: (id) => {
        return axiosClient.delete(`/suppliers/${id}`);
    },
    searchSupplier: (name) => {
        return axiosClient.get("/suppliers/search", {
            params: {
                name: name,
            },
        });
    },
};

export default supplierServices;
