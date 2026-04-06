// const express = require("express");
// const router = express.Router();

// const auth = require("../middleware/auth.middleware");
// const {
//   placeOrder,
//   getOrders
// } = require("../controllers/order.controller");
import express from "express"
import auth from "../middleware/auth.middleware.js"
import { placeOrder,getOrders } from "../controllers/order.controller.js";

const router=express.Router();

router.post("/", auth, placeOrder);
router.get("/", auth, getOrders);

// module.exports = router;
export default router;