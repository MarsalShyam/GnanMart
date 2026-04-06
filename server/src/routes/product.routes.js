import express from "express";
import {createProduct, getProducts, getProductById } from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//public
router.get("/", getProducts);
router.get("/:id", getProductById);

//vendor
router.post("/",authMiddleware,createProduct)

export default router;