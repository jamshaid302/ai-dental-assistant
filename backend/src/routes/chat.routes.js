const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { chat, getChatHistory } = require("../controllers/chat.controller");

router.use(auth);

router.post("/", chat);
router.get("/:patientId", getChatHistory);

module.exports = router;
