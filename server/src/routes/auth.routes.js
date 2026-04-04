import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", authMiddleware, loginUser);

export default router;