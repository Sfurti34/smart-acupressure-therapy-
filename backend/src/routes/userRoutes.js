const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// Get Logged-in User
router.get("/profile", protect, getProfile);

// Update Logged-in User
router.put("/profile", protect, updateProfile);

module.exports = router;