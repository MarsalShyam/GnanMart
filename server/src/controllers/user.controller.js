import User from "../models/User.js";  


export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, avatar },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};