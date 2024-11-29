const Product = require("../models/Product");

// Recommend similar products based on brand and category
const recommendSimilarProducts = async (productId) => {
  const product = await Product.findById(productId);

  // Find products that share the same brand or category
  const recommendations = await Product.find({
    _id: { $ne: productId }, // Exclude the current product
    $or: [{ brand: product.brand }, { categories: product.categories }],
  }).limit(5).select('-__v -updatedAt -createdAt'); // Limit to top 5 recommendations

  return recommendations;
};

module.exports = { recommendSimilarProducts };
