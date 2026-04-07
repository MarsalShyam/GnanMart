import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { toggleWishlist, getWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/toggle", authMiddleware, toggleWishlist);
router.get("/", authMiddleware, getWishlist);

export default router;