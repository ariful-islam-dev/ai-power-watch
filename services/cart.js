
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { notFound, badRequest } = require("../utils/error");

// Helper function to calculate total price
const calculateTotalPrice = (items) => {
  const total = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  return total;
};

// Add item to cart or update quantity if item exists
const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw notFound("Product not found");
  }

  // Create a new cart item
  const cartDTO = {
    user: userId,
    product: productId,
    quantity
  };

  const cart = new Cart(cartDTO);
  await cart.save();

  // Update product stock quantity
  product.stock -= quantity;
  await product.save();

  return cart;
};

// Remove item from cart

// Get user's cart
const getCarts = async (userId) => {
  const cart = await Cart.find({ user: userId }).select("-__v").populate("product", {name:1, price: 1, images: 1, title: 1 });
  if(!cart) throw notFound("Cart not found");

  const totalPrice = calculateTotalPrice(cart);
  
  return { cart, totalPrice };
};


// Get Cart By Id
const getCartById = async (cartId, userId) => {
  const cart = await Cart.findOne({ user: userId, _id: cartId }).select("-__v").populate("product", {name:1, title: 1, images: 1, stock: 1, price: 1 });
  if (!cart) throw notFound("Cart not found");
  return cart;
};
// Update item quantity in cart
const updateCart = async (cartId, quantity, userId) => {
  const cart = await Cart.findById({ user: userId, _id: cartId }).select("-__v");
  if (!cart) throw notFound("Cart not found");

  // Update Product Strock Quantity
  const product = await Product.findById(cart.product);
  product.stock += cart.quantity - quantity;
  await product.save();

  cart.quantity = quantity;
  await cart.save();

  return cart;
};

// Delete item from cart

const removeFromCart = async (cartId, userId) => {
    
    const cart = await Cart.findById({ user: userId, _id: cartId }).select("-__v");
    console.log(cart)
    if (!cart) throw notFound("Cart not found");

    // Update Product Strock Quantity
    const product = await Product.findById(cart.product);
    product.stock += cart.quantity;
    await product.save();

    await Cart.findByIdAndDelete(cartId);
  
    return {
      message: "Cart item deleted successfully",
    }
  };

module.exports = {
  addToCart,
  removeFromCart,
  getCarts,
  updateCart,
  getCartById,
};
