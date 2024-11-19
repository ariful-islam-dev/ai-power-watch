const {
  findAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUserProfile,
} = require("../services/user");
const { generateJwtToken } = require("../token");
const { query } = require("../utils");
const { serverError, badRequest } = require("../utils/error");
const count = require("../services/count");
const defaultConfig = require("../config/default");
const User = require("../models/User");
const cloudinaryPublicId = require("../utils/cloudinaryPublicId");
const cloudinaryDeleteImage = require("../utils/cloudinaryDeleteImage")

const getAllUsersController = async (req, res) => {
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
    serverError(error.message);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await getSingleUser(req.params.id);

    res.status(200).json({
      code: 200,
      message: "GET Single User",
      data: user,
    });
  } catch (error) {
    serverError(error.message);
  }
};

const userAvaterController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getSingleUser(id);
    if (!user) return res.status(404).json(badRequest("User not found"));

    user.avatar = req.body.avatar || user.avatar;

    await user.save();

    res.status(200).json({
      code: 200,
      message: "Update User Profile Image",
      data: user,
    });
  } catch (error) {
    serverError(error.message);
  }
};

const updateUserProfileController = async (req, res) => {
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

    res.status(200).json({
      code: 200,
      message: "Update User Profile",
      data: user,
      token,
    });
  } catch (error) {
    serverError(error.message);
  }
};

// @ Delete User
// @ route DELETE /api/users/:id

const deleteuserController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getSingleUser(id);

    if(user.avatar.length > 0) {
      const publicId = cloudinaryPublicId(user.avatar);
      const publicIdWithDir = `ai-power-watch/${publicId}`

      await cloudinaryDeleteImage(publicIdWithDir);
    }

    await deleteUserProfile(id);
    res.status(200).json({
      code: 200,
      message: "Delete User Successfully",
    });
  } catch (error) {
    serverError(error.message);
  }
};
module.exports = {
  getAllUsersController,
  getUserByIdController,
  userAvaterController,
  updateUserProfileController,
  deleteuserController
};
