import axios from "./axios";

export const toggleWishlist = (token, productId) => {
  return axios.post(
    "/wishlist/toggle",
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getWishlist = (token) => {
  return axios.get("/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
  });
};