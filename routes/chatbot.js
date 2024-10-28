const express = require('express');
const router = express.Router();
const { handleChatbotRequest } = require('../services/chatbot');

router.post('/dialogflow', handleChatbotRequest);

module.exports = router;
