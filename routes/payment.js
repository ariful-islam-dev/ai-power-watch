const express = require("express");
const {
  createStripeSession,
  handlePaymentSuccess,
} = require("../services/paymentService");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Order = require("../models/Order");

// @route   POST /api/payments/create-session
// @desc    Create a Stripe checkout session
router.post("/create-session", protect, async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId).populate("orderItems.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const sessionUrl = await createStripeSession(order);
    res.json({ url: sessionUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/payments/webhook
// @desc    Stripe webhook to handle successful payment
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    try {
      const signature = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        await handlePaymentSuccess(session.id);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);

module.exports = router;
