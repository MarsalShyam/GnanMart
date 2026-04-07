// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

export const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id })
    .populate("items.productId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart empty" });
  }

  let total = 0;

  const items = cart.items.map(item => {
    total += item.productId.price * item.quantity;

    return {
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price
    };
  });

  // ✅ STOCK REDUCE
  for (const item of cart.items) {
    const product = await Product.findById(item.productId._id);

    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `${product.name} out of stock`
      });
    }

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    userId: req.user.id,
    items,
    totalAmount: total
  });

  cart.items = [];
  await cart.save();

  res.json(order);
};

// Order history
export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })
    .populate("items.productId");

  res.json(orders);
};