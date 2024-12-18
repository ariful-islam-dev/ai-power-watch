const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../services/order");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware"); // Assuming an auth middleware
const { getOrdersController } = require("../controlers/orders");

const orderRoutes = (router) => {
  // @route   POST /api/orders
  // @desc    Create new order
  router.post("/orders", protect, );

  // @route   GET /api/orders
  // @desc    Get logged-in user's orders
  router.get("/orders", protect, getOrdersController );

  // @route   GET /api/orders/:id
  // @desc    Get order by ID
  router.get("/orders/:id", protect, async (req, res) => {
    try {
      const order = await getOrderById(req.params.id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // @route   PUT /api/orders/:id/pay
  // @desc    Update order to paid
  router.put("/orders/:id/pay", protect, async (req, res) => {
    try {
      const paymentResult = req.body.paymentResult;
      const updatedOrder = await updateOrderToPaid(
        req.params.id,
        paymentResult
      );
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // @route   PUT /api/orders/:id/deliver
  // @desc    Update order to delivered
  router.put("/orders/:id/deliver", protect, async (req, res) => {
    try {
      const updatedOrder = await updateOrderToDelivered(req.params.id);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};

module.exports = orderRoutes;
