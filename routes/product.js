

const { recommendSimilarProducts } = require("../services/recommendation");


const {
  cloudinaryUploadProduct,
  uploadProductImagesToCloudinary,
} = require("../middlewares/cloudinaryUpload");
const { protect } = require("../middlewares/authMiddleware");
const authorization = require("../middlewares/authorization");
const { createProductController, getProductController, getProductByIdController } = require("../controlers/product");



const productRoutes = (router) => {
  // @route   GET /api/recommendations/:productId
  // @desc    Get product recommendations for a given product
  router.get("/recommendations/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
      const recommendations = await recommendSimilarProducts(productId);
      res
        .json({
          code: 200,
          data: recommendations,
          message: "Recommendations fetched successfully",
        })
        .status(200);
    } catch (error) {
      console.error("Error in recommending products:", error);
      throw new Error("Could not fetch recommendations");
    }
  });

  // @route   GET /api/products
  // @desc    Get all products

  router.get("/products", getProductController)

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
};

module.exports = productRoutes;
