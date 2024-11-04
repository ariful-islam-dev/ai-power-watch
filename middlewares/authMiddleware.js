const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const { authenticationError } = require('../utils/error');

const protect = async (req, res, next) => {
    let token;
    
    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user data to request object (excluding password)
            req.user = await User.findById(decoded.id).select('-password');



            next(); // Proceed to the next middleware or route handler
        } catch (error) {
           next(authenticationError(error.message));
        }
    }

    if (!token) {
        next(authenticationError('You are not authenticated!'));
    }
};

module.exports = { protect };
