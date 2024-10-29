const express = require('express');
const { getChatbotResponse } = require('../services/chatbot');
const router = express.Router();

// @route   POST /api/chatbot/message
// @desc    Get chatbot response
router.post('/message', async (req, res) => {
    const { message } = req.body;

    try {
        const botResponse = await getChatbotResponse(message);
        res.json({ response: botResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error with chatbot response' });
    }
});

module.exports = router;
