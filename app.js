
const express = require("express");
const applyAllMiddleware = require("./middlewares/index.js");
const routers = require("./routes/index.js");
// const { error } = require("express-openapi-validator");


const app = express();


// @ Middleware
applyAllMiddleware(app)


app.get("/", (_req, res) => {
    res.redirect("/docs")
})

// @ test heath route check
app.get("/health", (_req, res)=>{
    res.status(200).json({
        message: "OK"
    })
});
// @ Routes

app.use("/api", routers);



// @ Global Error handler
app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: err.errors,
    });
});

module.exports = app