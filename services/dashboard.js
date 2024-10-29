const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Review = require('../models/Review');

// Calculate total and new users
const getUserAnalytics = async () => {
    const totalUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({ createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } });
    
    return {
        totalUsers,
        newUsers
    };
};

// Calculate total and average order value
const getOrderAnalytics = async () => {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    return {
        totalOrders,
        totalRevenue,
        avgOrderValue
    };
};

// Get bestselling products
const getProductPerformance = async () => {
    const products = await Product.find().populate('reviews');
    const bestsellers = products.sort((a, b) => b.sales - a.sales).slice(0, 5); // assuming products have 'sales' field
    const productReviews = await Review.aggregate([
        { $group: { _id: '$product', avgRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } },
        { $sort: { avgRating: -1 } },
        { $limit: 5 }
    ]);

    return {
        bestsellers,
        productReviews
    };
};

module.exports = {
    getUserAnalytics,
    getOrderAnalytics,
    getProductPerformance
};
