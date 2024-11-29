const routers = require("express").Router();
const productRoutes = require("./product");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const cartsRouter = require("./cart");
const orderRoutes = require("./order");

productRoutes(routers);
authRoutes(routers);
userRoutes(routers);
cartsRouter(routers);
orderRoutes(routers);





module.exports = routers