const admin = (req, res, next) => {
    if (req.user && req.user.type === 'admin') {
        next(); // User is an admin, allow access
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { admin };
