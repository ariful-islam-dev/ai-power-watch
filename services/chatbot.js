const { Product } = require('../models/Product');
const { Order } = require('../models/Order');

const handleChatbotRequest = async (req, res) => {
    const intent = req.body.queryResult.intent.displayName;

    let responseText = 'Sorry, I didn’t understand that. Can you rephrase?';

    if (intent === 'Product Inquiry') {
        const products = await Product.find(); // Fetch products dynamically
        responseText = `We have the following watches: ${products.map(p => p.name).join(', ')}.`;
    } else if (intent === 'Order Status') {
        const orderId = req.body.queryResult.parameters.orderId; // Capture order ID from user input
        const order = await Order.findById(orderId);

        if (order) {
            responseText = `Your order status is: ${order.isDelivered ? 'Delivered' : 'In Process'}`;
        } else {
            responseText = 'Sorry, I couldn’t find an order with that ID.';
        }
    }

    res.json({
        fulfillmentText: responseText
    });
};

module.exports = {
    handleChatbotRequest
};
