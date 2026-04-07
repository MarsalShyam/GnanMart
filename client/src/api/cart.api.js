import axios from "./axios";

export const addToCart = (token, productId) =>
  axios.post("/cart", { productId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getCart = (token) =>
  axios.get("/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const removeFromCart = (token, productId) =>
  axios.delete(`/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });