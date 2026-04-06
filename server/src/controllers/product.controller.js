import Product from "../models/Product.js";


//Creating Product for Vendor
export const createProduct=async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
      vendorId: req.user.id
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Getting All Products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


//Getting single Product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};