const express = require('express');

const bodyParserMiddleware = express.json(); // Parse JSON data in request body

module.exports = { bodyParserMiddleware };
