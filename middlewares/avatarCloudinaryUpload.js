// Import Cloudinary config
const cloudinaryPublicId = require("../utils/cloudinaryPublicId");
const cloudinaryUploadImage = require("../utils/cloudinaryUploadImage");
const cloudinaryDeleteImage = require("../utils/cloudinaryDeleteImage")
const {serverError } = require("../utils/error");
const upload = require("../utils/multer");

// Set storage engine to memory for Cloudinary

// Middleware to upload images to Cloudinary
const avatarUpload = upload.single("avatar"); // Allow up to 5 images

const avatarCloudinaryUpload = async (req, _res, next) => {
    
    const dir = "ai-power-watch";

  try {
    let result = "";

    if(req.user.avatar.length > 0) {
        let publicId = cloudinaryPublicId(req.user.avatar);
        let publicIdWithDir = dir+"/"+publicId;
         const imgResult = await cloudinaryDeleteImage(publicIdWithDir);
         if(imgResult === "ok"){
             result = await cloudinaryUploadImage(req.file.path, dir);
         }else{
           next(serverError("Error while deleting image"))
         }
    }else{

        result = await cloudinaryUploadImage(req.file.path, dir);
    }


    req.body.avatar = result;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    next(error);
  }
};

module.exports = { avatarUpload, avatarCloudinaryUpload };
