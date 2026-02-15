const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const patientRoutes = require("./patient.routes");
const chatRoutes = require("./chat.routes");

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/chat", chatRoutes);

module.exports = {
  apiRoutes: router,
};
