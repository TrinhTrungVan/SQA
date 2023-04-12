import axiosClient from "../axiosClient";

const productServices = {
    getProducts: () => {
        return axiosClient.get("/products");
    },
    getProductDetail: (id) => {
        return axiosClient.get(`/products/${id}`);
    },
    createProduct: (data) => {
        return axiosClient.post("/products/create", data);
    },
    updateProduct: (id, newData) => {
        return axiosClient.put(`/products/${id}`, newData);
    },
    deleteProduct: (id) => {
        return axiosClient.delete(`/products/${id}`);
    },
    searchProduct: (name) => {
        return axiosClient.get("/products/search", {
            params: {
                name: name,
            },
        });
    },
};

export default productServices;
