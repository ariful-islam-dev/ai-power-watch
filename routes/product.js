const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product");
const { recommendSimilarProducts } = require("../services/recommendation");
// const multer = require("multer");
// const upload = multer({dest: 'uploads/'});
const { query } = require("../utils");
const defaultConfig = require("../config/default");

const {
  cloudinaryUpload,
  uploadImagesToCloudinary,
} = require("../middlewares/cloudinaryUpload");
const { protect } = require("../middlewares/authMiddleware");
const count = require("../services/count");

const router = express.Router();



const productRoutes = (router) => {
  // @route   GET /api/recommendations/:productId
// @desc    Get product recommendations for a given product
router.get('/recommendations/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
      const recommendations = await recommendSimilarProducts(productId);
      res.json({
          code: 200,
          data: recommendations,
          message: 'Recommendations fetched successfully',
      }).status(200);
      
  } catch (error) {
      console.error('Error in recommending products:', error);
      throw new Error('Could not fetch recommendations');
  }
});


  // @route   GET /api/products
  // @desc    Get all products
  router.get("products/", async (req, res) => {
    const page = req.query.page || defaultConfig.page;
    const limit = req.query.limit || defaultConfig.limit;
    const sortType = req.query.sort_type || defaultConfig.sortType;
    const sortBy = req.query.sort_by || defaultConfig.sortBy;
    const search = req.query.search || defaultConfig.search;
    try {
      const products = await getProducts(page, limit, sortBy, sortType, search);

      const data = query.getTransformItems(
        products,
        [
          "id",
          "title",
          "description",
          "price",
          "category",
          "stock",
          "image",
          "averageRating",
          "brand",
        ],
        "/products"
      );
      // pagination
      const totalItems = await count(search);
      const pagination = query.getPagination(totalItems, page, limit);

      // links
      const links = query.getHeteOSItems(
        req.url,
        !!pagination.next,
        !!pagination.prev,
        page,
        req.path,
        req.query
      );
      // response
      const response = {
        code: 200,
        message: "Get All Product List",
        data,
        pagination,
        links,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = router;
