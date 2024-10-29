const Review = require('../models/Review');
const Product = require('../models/Product');

// Add a new review for a product
const addReview = async (userId, productId, rating, comment) => {
    const review = new Review({
        user: userId,
        product: productId,
        rating,
        comment
    });

    await review.save();

    // Optionally, update product rating average (not shown here)
    return review;
};

// Update an existing review
const updateReview = async (reviewId, userId, rating, comment) => {
    const review = await Review.findById(reviewId);

    if (!review) throw new Error('Review not found');
    if (review.user.toString() !== userId) throw new Error('User not authorized');

    review.rating = rating;
    review.comment = comment;

    return await review.save();
};

// Fetch all reviews for a specific product
const getReviewsByProduct = async (productId) => {
    return await Review.find({ product: productId }).populate('user', 'name');
};

// Delete a review
const deleteReview = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);

    if (!review) throw new Error('Review not found');
    if (review.user.toString() !== userId) throw new Error('User not authorized');

    return await review.remove();
};

module.exports = {
    addReview,
    updateReview,
    getReviewsByProduct,
    deleteReview
};
