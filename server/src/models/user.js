import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: {
    type: String,
    enum: ["student", "vendor", "admin"],
    default: "student"
  },
  firebaseUID: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);