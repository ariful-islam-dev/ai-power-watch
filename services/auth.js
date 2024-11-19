
const token = require("../token/index.js");
const User = require("../models/User");
const { badRequest } = require("../utils/error");

const login = async (email, password) => {

    const user = await User.findOne({ email });
    
    if(!user) {
        throw badRequest('Invalid credentials');
    }

    // @ Match Password
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
        throw badRequest('Invalid credentials');
      }

    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    

    const authToken = await token.generateJwtToken(payload);

    return {
        name: user.name,
        email: user.email,
        role: user.role,
        avater: user.avatar,
        token: authToken
    }
};


// @desc   Register a new user
// @route  POST /api/users/register
const registerUser = async(name, email, password) => {

    // Super Admin
    const userEmpty = await User.find();

    if (userEmpty.length === 0) {
        const superAdmin = await User.create({
           name, email, password, role: 'admin',
        });

        const payload = {
            id: superAdmin._id,
            name: superAdmin.name,
            email: superAdmin.email,
            role: superAdmin.role
        }
        
           return{
                name: superAdmin.name,
                email: superAdmin.email,
                role: superAdmin.role,
                avater: superAdmin.avatar,
                token: await token.generateJwtToken(payload),
            }
        
    }
    

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw badRequest('User already exists'); 
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password, // Password will be hashed in the pre-save hook (from userSchema)
    });

    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

   return {
        name: user.name,
        email: user.email,
        role: user.role,
        avater: user.avatar,
        token: await token.generateJwtToken(payload),
   }
};

module.exports = {
    login,
    registerUser
}