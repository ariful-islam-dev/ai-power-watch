const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (userId, orderData) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = orderData;

    const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
    });

    return await order.save();
};

// Get orders for a specific user
const getUserOrders = async (userId) => {
    return await Order.find({ user: userId }).populate('orderItems.product');
};

// Get a specific order by ID
const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('orderItems.product');
};

// Update order to paid
const updateOrderToPaid = async (orderId, paymentResult) => {
    const order = await Order.findById(orderId);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = paymentResult;

        return await order.save();
    } else {
        throw new Error('Order not found');
    }
};

// Update order to delivered
const updateOrderToDelivered = async (orderId) => {
    const order = await Order.findById(orderId);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        return await order.save();
    } else {
        throw new Error('Order not found');
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
};
