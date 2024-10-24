const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../services/productService');
const { protect, admin } = require('../middlewares/authMiddleware'); // Protect routes & require admin
const { cloudinaryUpload, uploadImagesToCloudinary } = require('../middlewares/cloudinaryUpload');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get a product by ID
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create a product
router.post('/', cloudinaryUpload, uploadImagesToCloudinary, createProduct);

// @route   PUT /api/products/:id
// @desc    Update a product
router.put('/:id', cloudinaryUpload, uploadImagesToCloudinary, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
