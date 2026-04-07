// const Cart = require("../models/Cart");
import Cart from "../models/cart.js";
import Product from "../models/product.js"

// Add to cart
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId }]
    });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId });
    }

    await cart.save();
  }

  res.json(cart);
};

// Get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id })
    .populate("items.productId");

  if(!cart) return res.json({items:[]});

  res.json(cart);
};

// Remove item
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter(
    item => item.productId.toString() !== productId
  );

  await cart.save();

  res.json(cart);
};