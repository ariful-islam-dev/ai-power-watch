const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const { addReview, updateReview, getReviewsByProduct, deleteReview } = require('../services/reviews');

// @route   POST /api/reviews/:productId
// @desc    Add a review to a product
router.post('/:productId', protect, async (req, res) => {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const review = await addReview(userId, productId, rating, comment);
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/reviews/:reviewId
// @desc    Update a review
router.put('/:reviewId', protect, async (req, res) => {
    const { rating, comment } = req.body;
    const { reviewId } = req.params;
    const userId = req.user.id;

    try {
        const updatedReview = await updateReview(reviewId, userId, rating, comment);
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/reviews/product/:productId
// @desc    Get all reviews for a product
router.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await getReviewsByProduct(productId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/reviews/:reviewId
// @desc    Delete a review
router.delete('/:reviewId', protect, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;

    try {
        await deleteReview(reviewId, userId);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
