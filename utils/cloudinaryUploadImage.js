const cloudinary = require("../config/cloudinary");
const { serverError } = require("./error");

const cloudinaryUploadImage = async (file, dir) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { folder: dir },
      (error, res) => {
        if (error) return serverError(error.message);
        resolve(res.secure_url);
      }
    );
  });
};

module.exports = cloudinaryUploadImage;
