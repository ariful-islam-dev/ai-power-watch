const Product = require("../models/Product");

// @desc   Get all products
// @route  GET /api/products
const getProducts = async (page, limit, sortBy, sortType, search) => {
  //sort
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };


  const products = await Product.find(filter)
    .select(["-__v", "-answers"])
    .populate()
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

    // console.log(products);
  return products
};

// @desc   Get a product by ID
// @route  GET /api/products/:id
const getProductById = async (id) => {

    const product = await Product.findById(id);

    return product
   
 
};

// @desc   Create a new product
// @route  POST /api/products
// @access Private/Admin
const createProduct = async (
  name,
  title,
  description,
  price,
  categories,
  stock,
  brand,
  images
) => {

  // console.log(name, title, brand, categories, price, description, images, stock);
 
  
  const product = await Product.create({
    name,
    title,
    description,
    price,
    categories,
    stock,
    brand,
    images
  });

  // const createdProduct = await product.save();
  return product;
};

const updateProduct = async (req, res) => {
  const { name, brand, categories, price, description, stock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.brand = brand || product.brand;
      product.categories = categories || product.categories;
      product.price = price || product.price;
      product.description = description || product.description;

      if (req.body.images && req.body.images.length > 0) {
        product.images = req.body.images; // Update with new Cloudinary image URLs
      }

      product.stock = stock || product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while updating product" });
  }
};

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
