const defaultConfig = require("../config/default");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { badRequest } = require("../utils/error");
const { generateJwtToken } = require("../token");

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
const getSingleUser = async (id) => {
  const user = await User.findById(id).select("-__v -password"); // `req.user` is set in the auth middleware

  if (!user) {
    res.status(404).json(badRequest("User not found"));
  }

  return user;
};

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private (requires token)
const updateUserProfile = async (id, data) => {
  const user = await User.findById(id).select("-__v -password"); // `req.user` is set in the auth middleware

  if (!user) {
    return badRequest("User not found");
  }

  user.name = data.name || user.name;

  await user.save();

  return user;
};

// @desc   Delete user profile
// @route  DELETE /api/users/profile
// @access Private (requires token)
const deleteUserProfile = async (id) => {
  const user = await User.findById(id)
  if(!user) return badRequest("User not found");
  await user.deleteOne();
  return {
    message: "User deleted"
  }
}

module.exports = {
  getSingleUser,
  updateUserProfile,
  findAllUsers,
  deleteUserProfile
};
