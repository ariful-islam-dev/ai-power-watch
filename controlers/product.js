const query = require("../utils/query");
const defaultConfig = require("../config/default");
const { getProducts, createProduct, getProductById } = require("../services/product");
const count = require("../services/count");
const { serverError } = require("../utils/error");



const createProductController = async (req, res) => {
    const { name, title, description, price, categories, stock, brand, images } =
      req.body;


      // console.log(name, title, description, price, categories, stock, brand, images);
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
      res.status(200).json({
        code: 200,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json(serverError(error));
    }
  }

const getProductController = async (req, res) => {
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
      res.status(500).json(serverError(error.message));
    }
  }

  const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await getProductById(id);
      res.status(200).json({
        code: 200,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json(serverError(error.message));
    }
  }


module.exports = { createProductController, getProductController, getProductByIdController }