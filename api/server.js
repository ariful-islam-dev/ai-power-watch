const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

/**
 * Middlewares
 */
const { notFound, errorHandler } = require("./middlewares/errorsMiddleware");
const { logger } = require("./middlewares/loggerMiddleware");
const { allowCors } = require("./middlewares/corsMiddleware");
const { limiter } = require("./middlewares/rateLimitMiddleware");

/**
 * Routes
 */
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const recommendationRoutes = require("./routes/recommendation");
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")
const chatbotRoutes = require("./routes/chatbot")
const reviewRoutes = require("./routes/review");
const dashboardRoutes = require("./routes/dashboard");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express(); // Body parser to parse JSON requests

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));



// Middleware
app.use(logger); // Logs each request
app.use(allowCors); // Enable CORS
app.use(express.json()); // Body parser
app.use(limiter); // Rate limiting

// Basic route for testing the server
app.get("/health", (req, res) => {
  res.json({ message: "Server is up and running!", status: 200 });
});

// Routes
app.use("/api/products", productRoutes); 
app.use("/api/users", userRoutes); 
app.use("/api/recommendations", recommendationRoutes); 
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chatboot",chatbotRoutes )
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);


// Route all other requests to React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
// Starting the server and database connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
