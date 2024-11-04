const axios = require("axios");
const Chatbot = require("../models/Chatbot");

const getChatbotResponse = async (userMessage, id) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const user = await Chatbot.findById(id);

    if (user) {
      await Chatbot.findByIdAndUpdate(id, {
        message: [
          ...user.message,
          { you: userMessage, me: response.data.choices[0].message.content },
        ],
      });
    }

    await Chatbot.create({
      user: id,
      message: [
        { you: userMessage, me: response.data.choices[0].message.content },
      ],
    });
    return {
        messages: await Chatboot.find({ user:id }),
        response: response.data.choices[0].message.content,
    }
  } catch (error) {
    console.error("Chatbot error:", error);
    throw new Error("Error getting response from chatbot");
  }
};

module.exports = { getChatbotResponse };
