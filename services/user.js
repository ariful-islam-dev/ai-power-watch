const defaultConfig = require("../config/default");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const findAllUsers = async (page, limit, sortBy, sortType, search) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const filter = {
    name: { $regex: search, $options: "i" },
  };

  const users = await User.find(filter)
    .select("-__v -password")
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return users;
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
    res.status(404).json({ message: "User not found" });
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
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  findAllUsers,
};
