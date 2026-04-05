import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    enum: ["sale", "rental"],
    default: "sale"
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);