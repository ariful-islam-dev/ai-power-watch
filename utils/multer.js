

const multer = require('multer');
const path = require("path");
const { badRequest } = require('./error');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024 //1MB
    },

    fileFilter: function (req, file, cb) {
        const exceptExtionList = ['.png', '.jpg', '.jpeg'];
        const extName = path.extname(file.originalname).toLowerCase();

        if(exceptExtionList.includes(extName)){
            return cb(null, true);
        }else{
            return cb(badRequest("Only .png, .jpg and .jpeg format allowed!"));
        }
    }
})

module.exports = upload;

