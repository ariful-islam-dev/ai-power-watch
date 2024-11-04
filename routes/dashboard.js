const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware'); // assume auth middleware checks admin status
const { getUserAnalytics, getOrderAnalytics, getProductPerformance } = require('../services/dashboard');
const { admin } = require('../middlewares/adminMiddleware');

// @route   GET /api/dashboard/user-analytics
// @desc    Get user analytics for the dashboard
router.get('/user-analytics', protect, admin, async (req, res) => {
    try {
        const data = await getUserAnalytics();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/dashboard/order-analytics
// @desc    Get order analytics for the dashboard
router.get('/order-analytics', protect, admin, async (req, res) => {
    try {
        const data = await getOrderAnalytics();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/dashboard/product-performance
// @desc    Get product performance data for the dashboard
router.get('/product-performance', protect, admin, async (req, res) => {
    try {
        const data = await getProductPerformance();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
