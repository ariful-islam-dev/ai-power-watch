const Product = require("../models/Product.js");

const count = async (search = "") => {
  const filter = {
    name: { $regex: search, $options: "i" },
  };
  return await Product.countDocuments(filter);
};

module.exports = count;
