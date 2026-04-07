import axios from "./axios";
export const getProducts = (params) => {
  return axios.get("/products", { params });
};


export const createProduct = (token, formData) => {
  return axios.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ GET VENDOR PRODUCTS
export const getMyProducts = (token) => {
  return axios.get("/products/vendor/my-products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ DELETE PRODUCT
export const deleteProduct = (id, token) => {
  return axios.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ UPDATE PRODUCT
export const updateProduct = (id, data, token) => {
  return axios.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};