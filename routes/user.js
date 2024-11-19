const express = require("express");
const {
  getUserProfile,
  updateUserProfile
} = require("../services/user");
const { protect } = require("../middlewares/authMiddleware"); 
const User = require("../models/User");
const {
  requestPasswordReset,
  resetPassword,
} = require("../services/resetPassword");
const authorization = require("../middlewares/authorization");
const { getAllUsersController,  userAvaterController, updateUserProfileController, getUserByIdController, deleteuserController } = require("../controlers/users");
const { avatarUpload, avatarCloudinaryUpload } = require("../middlewares/avatarCloudinaryUpload");

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
