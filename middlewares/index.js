const express = require("express");
const OpenApiValidator = require("express-openapi-validator");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require('cors')


const swaggerDocument = YAML.load("./swagger.yaml");




const applyAllMiddleware = (app)=>{
    app.use([
        express.urlencoded({ extended: true }),
        express.json(),
        morgan("dev"),
        cors()
      ]);
      
      app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
      
      // app.use(
      //   OpenApiValidator.middleware({
      //     apiSpec: "./swagger.yaml",
      //   })
      // );
      
      return app;
}

module.exports= applyAllMiddleware;
