

const { recommendSimilarProducts } = require("../services/recommendation");


const {
  cloudinaryUploadProduct,
  uploadProductImagesToCloudinary,
} = require("../middlewares/cloudinaryUpload");
const { protect } = require("../middlewares/authMiddleware");
const authorization = require("../middlewares/authorization");
const { createProductController, getProductController, getProductByIdController, updateProductController, deleteProductController, recommendSimilarProductsController } = require("../controlers/product");



const productRoutes = (router) => {
  // @route   GET /api/recommendations/:productId
  // @desc    Get product recommendations for a given product
  router.get("/products/recomendations/:productId", recommendSimilarProductsController);

  // @route   GET /api/products
  // @desc    Get all products

  router.get("/products", getProductController);

    // @route   POST /api/products/
    // @desc    Create new product
  router.post("/products",
      protect,
      authorization(["admin"]),
      cloudinaryUploadProduct,
      uploadProductImagesToCloudinary,
      createProductController
    );

  // @route   GET /api/products/:id
  // @desc    Get product by id
  router.get("/products/:id", getProductByIdController);

  // @route   PUT /api/products/:id
  // @desc    Update product by id

  router.put("/products/:id", protect, authorization(["admin"]), updateProductController );

  // @route   DELETE /api/products/:id
  // @desc    Delete product by id

  router.delete("/products/:id", protect, authorization(["admin"]), deleteProductController );

  return router;
};

module.exports = productRoutes;
