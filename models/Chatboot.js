const mongoose = require("mongoose");

const ChatbotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: [
    {
      you: {
        type: String,
        required: true,
      },
      me: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Chatbot", ChatbootSchema)