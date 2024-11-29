const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getSingleUser,
  getUserByEmail
} = require("../services/user");
const { protect } = require("../middlewares/authMiddleware"); 
const User = require("../models/User");
const {
  requestPasswordReset,
  resetPassword,
} = require("../services/resetPassword");
const authorization = require("../middlewares/authorization");
const { getAllUsersController,  userAvaterController, updateUserProfileController, getUserByIdController, deleteuserController, requestPasswordResetController, resetPasswordController } = require("../controlers/users");
const { avatarUpload, avatarCloudinaryUpload } = require("../middlewares/avatarCloudinaryUpload");
const { badRequest } = require("../utils/error");

const router = express.Router();

const userRoutes = (router) => {
  // @route   GET /api/users

  router.get("/users", protect, authorization(["admin"]), getAllUsersController )

  // @route   GET /api/users/profile
  // @desc    Get user profile (protected route)
  // @access  Private
  router.get("/users/:id", protect, getUserByIdController);

  // @route   PUT /api/users/profile
  // @desc    Update user profile (protected route)
  // @access  Private
  router.put("/users/:id", protect, updateUserProfileController);

  // @route DELETE /api/users/:id
  // @desc Delete user (protected route)
  // @access Private
  router.delete("/users/:id", protect, deleteuserController);

  // @route   PUT /api/users/:id Avater
  // @desc    Update user profile Image (protected route)
  // @access  Private
  router.put("/users/:id/avatar", protect, avatarUpload, avatarCloudinaryUpload, userAvaterController);

  // POST /api/auth/forgot-password - Request a password reset
  router.post("/users/forgot-password", requestPasswordResetController);

  // POST /api/auth/reset-password/:token - Reset password using token
  router.put("/users/reset-password/:token", resetPasswordController );

  return router;
};

module.exports = userRoutes;
