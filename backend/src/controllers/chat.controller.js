const prisma = require("../config/prisma");
const { generateAIResponse } = require("../services/ai.service");

exports.chat = async (req, res) => {
  const { patientId, message } = req.body;

  await prisma.chat.create({
    data: {
      patientId,
      role: "user",
      message,
    },
  });

  const aiReply = await generateAIResponse(message);

  await prisma.chat.create({
    data: {
      patientId,
      role: "assistant",
      message: aiReply,
    },
  });

  res.json({ reply: aiReply });
};

exports.getChatHistory = async (req, res) => {
  const { patientId } = req.params;

  const chats = await prisma.chat.findMany({
    where: { patientId },
    orderBy: { createdAt: "asc" },
  });

  res.json(chats);
};
