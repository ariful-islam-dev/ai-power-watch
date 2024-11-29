const defaultConfig = require("../config/default");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { badRequest, notFound } = require("../utils/error");
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
    return notFound("User not found");
  }

  return user;
};

// @desc   Get user By Email
// @route  GET /api/users/
// @access 

const getUserByEmail = async (email) => {
  const user = await User.findOne({email}).select("-__v -password"); // `req.user` is set in the auth middleware

  if (!user) {
    badRequest("User not found")
  }

  return user;
  }

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private (requires token)
const updateUserProfile = async (id, data) => {
  

  const user = await User.findById(id).select("-__v -password"); // `req.user` is set in the auth middleware

  if (!user) {
    throw notFound("User not found");
  }

  user.name = data.name || user.name;

  await user.save();

  return user;
};

const userAvater = async(id, avatar) => {

  const user = await User.findById(id).select("-__v -password"); // `req.user` is set in the auth middleware
  console.log(user);

  if (!user) {
    throw notFound("User not found");
  }


  user.avatar = avatar || user.avatar;

  await user.save();

  return user;
}

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
  deleteUserProfile,
  getUserByEmail, 
  userAvater
};
