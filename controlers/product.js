const query = require("../utils/query");
const defaultConfig = require("../config/default");
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../services/product");
const count = require("../services/count");
const { recommendSimilarProducts } = require("../services/recommendation");



const createProductController = async (req, res, next) => {
    const { name, title, description, price, categories, stock, brand, images } =
      req.body;



    try {

      const product = await createProduct(
        name,
        title,
        description,
        price,
        categories,
        stock,
        brand,
        images
      );
      res.status(201).json({
        code: 201,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

const getProductController = async (req, res, next) => {

    const page = parseInt(req.query.page || defaultConfig.page);
    const limit = parseInt(req.query.limit || defaultConfig.limit);
    const sortType = req.query.sort_type || defaultConfig.sortType;
    const sortBy = req.query.sort_by || defaultConfig.sortBy;
    const search = req.query.search || defaultConfig.search;

    
    try {
      const products = await getProducts(
        page,
        limit,
        sortBy,
        sortType,
        search
      );
    



      const data = query.getTransformItems(
        products,
        [
          "id",
          "name",
          "title",
          "description",
          "price",
          "categories",
          "stock",
          "images",
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

      // res.status(200)
      res.status(200).json(response);
    } catch (error) {
      next(error)
    }
  }

  const getProductByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await getProductById(id);
      res.status(200).json({
        code: 200,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      next(error)
    }
  }


  // @ Update Product controller
  const updateProductController = async (req, res, next) => {

    try {
      const product = await updateProduct(req.params.id, req.body);
      

      res.status(203).json({
        code: 203,
        message: "Product updated successfully",
        data: product,
      });
      
    } catch (error) {
      next(error)
    }
  }

  // @ Delete Product controller
  const deleteProductController = async (req, res, next) => {
    try {
       await deleteProduct(req.params.id);
      res.status(203).json({
        code: 203,
        message: "Product deleted successfully"
      });
    } catch (error) {
      next(error)
    }
  }


  // @ Product Recommendation controller

  const recommendSimilarProductsController = async (req, res, next) => {
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
      next(error);
    }
  }


module.exports = { createProductController, getProductController, getProductByIdController,updateProductController, deleteProductController, recommendSimilarProductsController };