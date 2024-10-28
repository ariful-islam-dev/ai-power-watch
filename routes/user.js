const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../services/userServices');
const { protect } = require('../middlewares/authMiddleware'); // Authentication middleware
const { admin } = require('../middlewares/adminMiddleware');
const User = require('../models/User');

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
