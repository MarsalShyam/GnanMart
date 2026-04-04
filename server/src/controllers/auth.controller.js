import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { uid, email, name } = req.user;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      firebaseUID: uid
    });
  }

  res.json(user);
};