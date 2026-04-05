import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMe, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/update", authMiddleware, updateProfile);

export default router;