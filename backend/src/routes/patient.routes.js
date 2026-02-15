const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

router.use(auth);

router.post("/", createPatient);
router.get("/", getPatients);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;
