const { protect } = require("../middlewares/authMiddleware"); // Assuming an auth middleware
const { getCartController,  addToCartController, updateCartController, removeFromCartController, getCartByIdController } = require("../controlers/carts");
const authorization = require("../middlewares/authorization");

const cartsRouter = (router) => {
  router.get("/carts", protect, getCartController);
  // @route   POST /api/cart/add
  // @desc    Add item to cart
  router.post("/carts", protect, addToCartController);



  // @route   GET /api/carts/:id
  // @desc    Get cart by id
  router.get("/carts/:id", protect, getCartByIdController);

  // @route   PUT /api/cart/update
  // @desc    Update item quantity in cart
  router.put("/carts/:id", protect, updateCartController );

  // @route   DELETE /api/cart/remove
  // @desc    Remove item from cart
  router.delete("/carts/:id", protect, removeFromCartController );

  return router;
};

module.exports = cartsRouter;
