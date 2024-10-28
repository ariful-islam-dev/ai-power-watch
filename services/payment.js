const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create a Stripe payment session
const createStripeSession = async (order) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: order.orderItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name, // Replace with dynamic product name
                },
                unit_amount: item.price * 100, // Stripe accepts amounts in cents
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/order/cancel`,
    });

    return session.url;
};

// Handle Stripe payment success and update order status
const handlePaymentSuccess = async (sessionId) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata.order_id;

    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: session.payment_intent,
        status: session.payment_status,
        updateTime: Date.now(),
        emailAddress: session.customer_details.email,
    };

    await order.save();
    return order;
};

module.exports = {
    createStripeSession,
    handlePaymentSuccess,
};
