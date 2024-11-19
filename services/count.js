const Product = require("../models/Product.js");

const count = async (search = "", model) => {
  const filter = {
    name: { $regex: search, $options: "i" },
  };
  return await model.countDocuments(filter);
};

module.exports = count;
