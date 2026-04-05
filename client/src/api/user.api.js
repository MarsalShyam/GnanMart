import axios from "./axios";

export const getMe = async (token) => {
  const res = await axios.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data;
};

export const updateProfile = async (token, data) => {
  const res = await axios.put("/users/update", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data;
};

