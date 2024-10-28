const express = require('express');

const router = express.Router();
const {protect} = require("../middlewares/authMiddleware") // Assuming an auth middleware
const {
    addToCart,
    removeFromCart,
    getCart,
    updateCartItemQuantity,
} = require('../services/cart');
const { admin } = require('../middlewares/adminMiddleware');
const Cart = require('../models/Cart');

// @route   GET /api/cart
// @desc    Get user's cart


router.get('/',protect, async (req, res) => {
    try {
        const cart = await getCart(req.user._id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/all-cart", protect, admin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
router.post('/add', protect, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const updatedCart = await addToCart(req.user._id, productId, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/cart/update
// @desc    Update item quantity in cart
router.put('/update', protect, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const updatedCart = await updateCartItemQuantity(req.user._id, productId, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/cart/remove
// @desc    Remove item from cart
router.delete('/remove', protect, async (req, res) => {
    const { productId } = req.body;

    try {
        const updatedCart = await removeFromCart(req.user._id, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
