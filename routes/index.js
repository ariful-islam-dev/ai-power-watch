const routers = require("express").Router();
const productRoutes = require("./product");
const authRoutes = require("./auth");
const userRoutes = require("./user")

productRoutes(routers);
authRoutes(routers);
userRoutes(routers);





module.exports = routers