const cloudinary = require('../config/cloudinaryConfig'); // Import Cloudinary config
const multer = require('multer');

// Set storage engine to memory for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to upload images to Cloudinary
const cloudinaryUpload = upload.array('images', 5); // Allow up to 5 images

const uploadImagesToCloudinary = async (req, res, next) => {
    try {
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        throw new Error('Error uploading image to Cloudinary');
                    }
                    return result.secure_url; // Return the secure URL of the uploaded image
                }).end(file.buffer); // Send the file buffer to Cloudinary
            });

            // Wait for all uploads to complete
            const images = await Promise.all(uploadPromises);
            req.body.images = images; // Attach the array of image URLs to req.body
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { cloudinaryUpload, uploadImagesToCloudinary };
