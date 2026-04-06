// const mongoose = require("mongoose");
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      price: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    default: "placed"
  }

}, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);
export default mongoose.model("Order",orderSchema);