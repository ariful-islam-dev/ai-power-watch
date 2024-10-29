const Product = require('../models/Product');

// Recommend similar products based on brand and category
const recommendSimilarProducts = async (req, res) => {

    const productId = req.params.productId;
    try {
        const product = await Product.findById(req.params.productId);

        // Find products that share the same brand or category
        const recommendations = await Product.find({
            _id: { $ne: productId }, // Exclude the current product
            $or: [
                { brand: product.brand },
                { category: product.category }
            ]
        }).limit(5); // Limit to top 5 recommendations
        res.json(recommendations);
        
    } catch (error) {
        console.error('Error in recommending products:', error);
        throw new Error('Could not fetch recommendations');
    }
};

module.exports = { recommendSimilarProducts };
