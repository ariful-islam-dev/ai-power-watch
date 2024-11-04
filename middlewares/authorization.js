const { authorizationError } = require("../utils/error");

const authorization = (roles=['admin']) => async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(authorizationError("You don't have permission to access this resource"))
    }
    next();
 };

module.exports = authorization