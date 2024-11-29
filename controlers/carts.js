

const { addToCart,  getCarts, removeFromCart,  getCartById, updateCart } = require("../services/cart");
const { query } = require("../utils");

// @route   GET /api/carts
// @desc    Get user's cart
// @access  Private

const getCartController = async (req, res, next) => {
    try {
        const carts = await getCarts(req.user.id);
        const transformData = query.getTransformItems(
          carts.cart,
          ["id", "user", "product", "quantity", "createdAt", "updatedAt"],
          req.path
        );
        
        const response = {  
          code: 200,
          message: "Cart fetched successfully",
          data: {
            carts: transformData,
            totalPrice: carts.totalPrice
          }

        }
        res.json(response);
    } catch (error) { 
        next(error);
    }
}




// @route   POST /api/carts/:id
// @desc    Add item to cart
// @access  Private

const getCartByIdController = async (req, res, next) => {

    const { id } = req.params;
    const userId = req.user._id;
    try {
        const cart = await getCartById(id, userId);
        res.json(cart);
    } catch (error) {
        next(error.message);
    }
}


// @route   POST /api/carts/add
// @desc    Add item to cart
// @access  Private
const addToCartController = async (req, res, next) => {
    const { productId, quantity } = req.body;

    try {
      const addedCart = await addToCart(req.user._id, productId, quantity);
      res.status(201).json({
        code: 201,
        message: "Item added to cart successfully",
        data: addedCart,
      });
    } catch (error) {
     next(error.message);
    }
  }

  // @route   PUT /api/carts/delete
// @desc    Delete item from cart
// @access  Private
const removeFromCartController = async (req, res, next) => {
    const cartId = req.params.id
    const userId = req.user._id
    try {
      await removeFromCart(cartId, userId);
      res.status(204)
    } catch (error) {
      next( error.message );
    }
  }

const updateCartController =  async (req, res) => {
  const cartId = req.params.id;
  const userId = req.user._id
  const { quantity } = req.body;

  try {
    const updatedCart = await updateCart(
      cartId,
      quantity, userId
    )

    res.status(203).json({
      code: 203,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
   next(error.message );
  }
}

module.exports= { getCartController, addToCartController,getCartByIdController, removeFromCartController, updateCartController }