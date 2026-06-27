const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// REGISTER API
router.post("/register", registerUser);

// LOGIN API
router.post("/login", loginUser);

// Export router
module.exports = router;