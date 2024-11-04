const routers = require("express").Router();
const productRoutes = require("./product");
const authRoutes = require("./auth");
const userRoutes = require("./user")

// routers.use("/products", productRoutes );
// routers.use("/auth", authRoutes );
userRoutes(routers);



module.exports = routers