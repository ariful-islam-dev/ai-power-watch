
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { serverError } = require('../utils/error');


const generateJwtToken = async(payload, scret=process.env.JWT_SECRET, algorithm='HS256', expiresIn='1d') => {
    try {
        const token = await jwt.sign(payload, scret, { algorithm, expiresIn });
        return token;
    } catch (error) {
        throw serverError(error.message);
    }
}

module.exports = generateJwtToken 