import axios from "./axios";

export const loginUser = async (token, role) => {
  const res = await axios.post(
    "/auth/login",
    {role},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};