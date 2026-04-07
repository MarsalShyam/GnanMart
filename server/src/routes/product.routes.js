import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getVendorProducts,
  deleteProduct,
  updateProduct
} from "../controllers/product.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// 🌍 PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🛒 VENDOR
router.post("/", authMiddleware, upload.single("image"), createProduct);

router.get("/vendor/my-products", authMiddleware, getVendorProducts);


router.delete("/:id", authMiddleware, deleteProduct);

router.put("/:id",authMiddleware,updateProduct)

export default router;