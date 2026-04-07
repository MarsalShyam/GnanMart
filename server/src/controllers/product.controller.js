
import cloudinary from "../services/upload.service.js";
import Product from "../models/product.js";

// ✅ CREATE PRODUCT (supports both normal + cloudinary)
export const createProduct = async (req, res) => {
  try {
    const { 
      name, sku, category, size, 
      price, originalPrice, stock, 
      shortDescription, description, benefits, type 
    } = req.body;

    let imageUrl = req.body.image || "";

    // 📸 If image file uploaded -> send to Cloudinary
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploaded.secure_url;
    }

    const product = await Product.create({
      name, sku, category, size,
      price, originalPrice, stock,
      shortDescription, description, benefits, type,
      image: imageUrl,
      vendorId: req.user.id,
    });

    res.json(product);
  } catch (err) {
    console.log("Create Product Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET PRODUCTS (SEARCH + FILTER + SORT)
export const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    let products = Product.find(query);

    if (sort === "low") products = products.sort({ price: 1 });
    if (sort === "high") products = products.sort({ price: -1 });

    const result = await products;

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET VENDOR PRODUCTS
export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({
      vendorId: req.user.id,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔒 ensure only owner deletes
    if (product.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔒 only owner
    if (product.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};