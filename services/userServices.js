const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will expire in 30 days
    });
};

// @desc   Register a new user
// @route  POST /api/users/register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password, // Password will be hashed in the pre-save hook (from userSchema)
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc   Authenticate user & get token
// @route  POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private (requires token)
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id); // `req.user` is set in the auth middleware

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private (requires token)
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        // user.email = req.body.email || user.email;
        // user.isAdmin = req.body.isAdmin || user.isAdmin;

        if (req.body.password) {
            user.password = req.body.password; // Password will be re-hashed by the pre-save hook
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            type: updatedUser.type,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
