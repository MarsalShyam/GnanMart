import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type:String, required:true},
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: Number,

  image: String, // for Phase 3 basic
  
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