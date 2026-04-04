import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { uid, email, name } = req.user;
  const {role}=req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      firebaseUID: uid,
      role:role || "student"
    });
  }

  res.json(user);
};