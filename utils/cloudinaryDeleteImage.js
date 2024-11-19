const cloudinary = require("../config/cloudinary");

const cloudinaryDeleteImage = async (publicId) => {
   const result = await cloudinary.uploader.destroy(publicId)
   return result.result;
};

module.exports = cloudinaryDeleteImage;