const Product = require('../models/Product');

// @desc   Get all products
// @route  GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching products' });
    }
};

// @desc   Get a product by ID
// @route  GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching product' });
    }
};

// @desc   Create a new product
// @route  POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
    const { name, brand, category, price, description, images, stock } = req.body;

    try {
        const product = new Product({
            name,
            brand,
            category,
            price,
            description,
            images, // This should be the array of URLs from Cloudinary
            stock,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating product' });
    }
};

const updateProduct = async (req, res) => {
    const { name, brand, category, price, description,  stock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.price = price || product.price;
            product.description = description || product.description;

            if (req.body.images && req.body.images.length > 0) {
                product.images = req.body.images; // Update with new Cloudinary image URLs
            }

            product.stock = stock || product.stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating product' });
    }
};


// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting product' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
