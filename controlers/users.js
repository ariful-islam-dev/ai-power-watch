const {
  findAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUserProfile,
  getUserByEmail,
  userAvater,
} = require("../services/user");
const { generateJwtToken } = require("../token");
const { query } = require("../utils");
const { badRequest } = require("../utils/error");
const count = require("../services/count");
const defaultConfig = require("../config/default");
const User = require("../models/User");
const cloudinaryPublicId = require("../utils/cloudinaryPublicId");
const cloudinaryDeleteImage = require("../utils/cloudinaryDeleteImage");
const { requestPasswordReset, resetPassword } = require("../services/resetPassword");

const getAllUsersController = async (req, res, next) => {
  const page = req.query.page || defaultConfig.page;
  const limit = req.query.limit || defaultConfig.limit;
  const sortType = req.query.sort_type || defaultConfig.sortType;
  const sortBy = req.query.sort_by || defaultConfig.sortBy;
  const search = req.query.search || defaultConfig.search;

  try {
    const users = await findAllUsers(page, limit, sortBy, sortType, search);
    // console.log('Ariful Islam')

    const data = query.getTransformItems(
      users,
      ["id", "name", "email", "role", "avatar"],
      req.path
    );

    // @ pagination
    const totalItems = await count(search, User);
    const pagination = query.getPagination(totalItems, page, limit);

    // @ HeteOS Get links
    const links = query.getHeteOSItems(
      req.url,
      !!pagination.next,
      !!pagination.prev,
      page,
      req.path,
      req.query
    );

    res.status(200).json({
      code: 200,
      message: "GET All User",
      data,
      pagination,
      links,
    });
  } catch (error) {
    next(error)
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getSingleUser(req.params.id);

    res.status(200).json({
      code: 200,
      message: "GET Single User",
      data: user,
    });
  } catch (error) {
    next(error)
  }
};

const userAvaterController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userAvater(id, req.body.avatar);

    res.status(200).json({
      code: 200,
      message: "Update User Profile Image",
      data: user,
    });
  } catch (error) {
    next(error)
  }
};

const updateUserProfileController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await updateUserProfile(id, req.body);

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = await generateJwtToken(payload);

    res.status(203).json({
      code: 203,
      message: "Update User Profile",
      data: user,
      token,
    });
  } catch (error) {
    next(error)
  }
};

// @ Delete User
// @ route DELETE /api/users/:id

const deleteuserController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getSingleUser(id);

    if(user.avatar.length > 0) {
      const publicId = cloudinaryPublicId(user.avatar);
      const publicIdWithDir = `ai-power-watch/${publicId}`

      await cloudinaryDeleteImage(publicIdWithDir);
    }

    await deleteUserProfile(id);
    res.status(202).json({
      code: 202,
      message: "Delete User Successfully",
    });
  } catch (error) {
   next(error)
  }
};

// @desc Request Password Reset
// @route POST /api/users/forgot-password
const requestPasswordResetController = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Check Has user
    await getUserByEmail(email);
    // Send reset email
    await requestPasswordReset(email);
    res.json({
      code: 200,
      message: "Password reset email sent"
    });
  } catch (error) {
    next(error)
  }
}

// @desc Reset Password
// @route PUT /api/users/reset-password
const resetPasswordController = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const result = await resetPassword(token, newPassword);
    res.json({
      code: 203,
      message: result.message
    });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsersController,
  getUserByIdController,
  userAvaterController,
  updateUserProfileController,
  deleteuserController,
  requestPasswordResetController,
  resetPasswordController
};
