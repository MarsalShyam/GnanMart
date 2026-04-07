import axios from "./axios";

export const placeOrder = (token) => {
  return axios.post("/orders", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOrders = (token) => {
  return axios.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
};