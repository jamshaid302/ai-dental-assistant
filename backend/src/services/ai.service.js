const axios = require("axios");

exports.generateAIResponse = async (message) => {
  try {
    const res = await axios.post(process.env.AI_SERVICE_URL + "/generate", {
      message,
    });

    return res.data.reply;
  } catch (err) {
    return "AI service unavailable. Please try again.";
  }
};
