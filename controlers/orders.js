const { getUserOrders, createOrder } = require("../services/order");

const getOrdersController = async (req, res, next) => {
    try {
      const orders = await getUserOrders(req.user._id);
      res.status(200).json({
        code: 200,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      next(error.message);
    }
  }


// Create a new order
const createOrderController = async (req, res) => {
    try {
      const order = await createOrder(req.user._id, req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


module.exports = { getOrdersController };