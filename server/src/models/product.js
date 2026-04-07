import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  sku: { type: String }, // e.g., TH-AP-500
  category: { type: String },
  size: { type: String }, // e.g., 500g, XL

  // Pricing & Inventory
  price: { type: Number, required: true }, // Selling Price
  originalPrice: { type: Number },
  stock: { type: Number, default: 0 },

  // Descriptions
  shortDescription: { type: String },
  description: { type: String }, // Full description
  benefits: { type: String }, // Or ingredients/features
  
  // Media
  image: { type: String }, // Main image URL from Cloudinary

  // System
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["sale", "rental"],
    default: "sale",
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: Number,
    },
  ],
}, { timestamps: true });



// export default mongoose.model("Product", productSchema);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;