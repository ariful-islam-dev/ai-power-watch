const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  findAllUsers,
} = require("../services/user");
const { protect } = require("../middlewares/authMiddleware"); 
const User = require("../models/User");
const {
  requestPasswordReset,
  resetPassword,
} = require("../services/resetPassword");
const authorization = require("../middlewares/authorization");
const defaultConfig = require("../config/default");
const { query } = require("../utils");
const count = require("../services/count");
const { serverError } = require("../utils/error");

const router = express.Router();

const userRoutes = (router) => {
  // @route   GET /api/users
  router.get("/users", protect, authorization(["admin"]), async (req, res) => {
    const page = req.query.page || defaultConfig.page;
    const limit = req.query.limit || defaultConfig.limit;
    const sortType = req.query.sort_type || defaultConfig.sortType;
    const sortBy = req.query.sort_by || defaultConfig.sortBy;
    const search = req.query.search || defaultConfig.search;

    try {
      const users = await findAllUsers(page, limit, sortBy, sortType, search);

      const data = query.getTransformItems(
        users,
        ["id", "name", "email", "role", "avatar"],
        req.path
      );

      // @ pagination
      const totalItems = await count(search);
      const pagination = query.getPagination(totalItems, page, limit);

      // @ HeteOS Get links
      const links = query.getHeteOSItems(
        req.url,
        !!pagination.next,
        !!pagination.prev,
        page,
        req.path,
        req.query
      );

      res.status(200).json({
        code: 200,
        message: "GET All User",
        data,
        pagination,
        links,
      });
    } catch (error) {
      serverError(error.message);
    }
  });

  // @route   GET /api/users/profile
  // @desc    Get user profile (protected route)
  // @access  Private
  router.get("/users/:id", protect, getUserProfile);

  // @route   PUT /api/users/profile
  // @desc    Update user profile (protected route)
  // @access  Private
  router.put("/users/:id", protect, updateUserProfile);

  // POST /api/auth/forgot-password - Request a password reset
  router.post("/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const result = await requestPasswordReset(email);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // POST /api/auth/reset-password/:token - Reset password using token
  router.post("/reset-password/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const result = await resetPassword(token, newPassword);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};

module.exports = userRoutes;
