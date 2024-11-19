const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const cloudinaryUploadImage = require('../utils/cloudinaryUploadImage');
const upload = require("../utils/multer")

// Set storage engine to memory for Cloudinary

// Middleware to upload images to Cloudinary
const cloudinaryUploadProduct = upload.array('images', 5); // Allow up to 5 images

const uploadProductImagesToCloudinary = async (req, res, next) => {
    const dir = 'ai-power-watch'
    try {
        if (req.files && req.files.length > 0) {
            let urls = [];
            const files = req.files;
            for (const file of files) {
                const result = await cloudinaryUploadImage(file.path, dir)
                urls.push(result);
            }
            req.body.images = urls;
        }
   
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        next(error)
    }
};

module.exports = { cloudinaryUploadProduct, uploadProductImagesToCloudinary };
