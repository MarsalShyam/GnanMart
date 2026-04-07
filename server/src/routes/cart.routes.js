// const express = require("express");
import express from "express";
import auth from "../middleware/auth.middleware.js"
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const router = express.Router();


router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/:productId", auth, removeFromCart);

// module.exports = router;
export default router;