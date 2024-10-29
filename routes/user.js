const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../services/user');
const { protect } = require('../middlewares/authMiddleware'); // Authentication middleware
const { admin } = require('../middlewares/adminMiddleware');
const User = require('../models/User');
const { requestPasswordReset, resetPassword } = require('../services/resetPassword');

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user and get token
router.post('/login', loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile (protected route)
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile (protected route)
// @access  Private
router.put('/profile', protect, updateUserProfile);

// POST /api/auth/forgot-password - Request a password reset
router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const result = await requestPasswordReset(email);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST /api/auth/reset-password/:token - Reset password using token
  router.post('/reset-password/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const result = await resetPassword(token, newPassword);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// @route   GET /api/users
router.get('/', protect, admin, async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = router;
