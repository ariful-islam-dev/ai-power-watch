const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper function to calculate total price
const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

// Add item to cart or update quantity if item exists
const addToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ user: userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
        cart = new Cart({ user: userId, cartItems: [], totalPrice: 0 });
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    // Check if product already exists in cart
    const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        // Update quantity if item already exists in cart
        cart.cartItems[itemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.cartItems.push({
            product: productId,
            quantity,
            price: product.price,
        });
    }

    // Update total price
    cart.totalPrice = calculateTotalPrice(cart.cartItems);

    return await cart.save();
};

// Remove item from cart
const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    // Filter out the item to be removed
    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

    // Recalculate total price
    cart.totalPrice = calculateTotalPrice(cart.cartItems);

    return await cart.save();
};

// Get user's cart
const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
    return cart || { cartItems: [], totalPrice: 0 };
};

// Update item quantity in cart
const updateCartItemQuantity = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity = quantity;

        // Recalculate total price
        cart.totalPrice = calculateTotalPrice(cart.cartItems);

        return await cart.save();
    } else {
        throw new Error('Item not found in cart');
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    updateCartItemQuantity,
};
