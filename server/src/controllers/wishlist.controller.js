import Wishlist from "../models/Wishlist.js";

// TOGGLE WISHLIST (Add if missing, Remove if exists)
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, products: [] });
    }

    const productIndex = wishlist.products.indexOf(productId);

    if (productIndex > -1) {
      // Product exists, remove it
      wishlist.products.splice(productIndex, 1);
    } else {
      // Product doesn't exist, add it
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id })
      .populate("products");

    if (!wishlist) {
      return res.json({ products: [] });
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};