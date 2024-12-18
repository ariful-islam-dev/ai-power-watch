const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const paymentSession = async(orders)=>{

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orders.orderItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name, // Replace with dynamic product name
                    images: [item.product.images[0]],    
                },
                unit_amount: item.price * 100, // Stripe accepts amounts in cents
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/order/cancel`,
    })
}

module.exports = {paymentSession}