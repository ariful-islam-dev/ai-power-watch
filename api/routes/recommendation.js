const express = require('express');
const { recommendSimilarProducts } = require('../services/recommendation');
const router = express.Router();

// @route   GET /api/recommendations/:productId
// @desc    Get product recommendations for a given product
router.get('/:productId', recommendSimilarProducts);

module.exports = router;
