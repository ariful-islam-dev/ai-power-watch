const Product = require("../models/Product");
const cloudinaryDeleteImage = require("../utils/cloudinaryDeleteImage");
const cloudinaryPublicId = require("../utils/cloudinaryPublicId");
const {  notFound } = require("../utils/error");

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

  return products;
};

// @desc   Get a product by ID
// @route  GET /api/products/:id
const getProductById = async (id) => {
  const product = await Product.findById(id);
  console.log(product)
  
  if (!product) {
    throw notFound("Product not found");
  }

  return product;
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
  const product = await Product.create({
    name,
    title,
    description,
    price,
    categories,
    stock,
    brand,
    images,
  });

  // const createdProduct = await product.save();
  return product;
};

const updateProduct = async (id, request) => {

  const product = await Product.findById(id);

  if(!product){
    throw notFound("Product not found");
  }

  if (product) {
    product.name = request.name || product.name;
    product.brand = request.brand || product.brand;
    product.categories = product.categories.includes(request.categories) ? [ ...product.categories] : [...product.categories, ...request.categories];
    product.price = request.price || product.price;
    product.description = request.description || product.description;
    product.stock =  product.stock + request.stock || product.stock;
  }
  let newUpdate = await Product.findByIdAndUpdate(id, product, {
    new: true,
  }).select("-__v");

  return newUpdate;
};

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (id) => {

    const product = await Product.findById(id);
    
    if (!product) {
      throw notFound("Product not found");
    }

    // remove product images from cloudinary
    const dir = "ai-power-watch";

   if(product.images.length > 0){
    for (let i = 0; i < product.images.length; i++) {
      const publicId = cloudinaryPublicId(product.images[i]);
      let publicIdWithDir = dir+"/"+publicId;
      await cloudinaryDeleteImage(publicIdWithDir);
    }
   }

    await Product.findByIdAndDelete(id);
  return;

};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
