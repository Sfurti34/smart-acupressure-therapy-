const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

// GET PROFILE (Protected)
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user
  });
});

module.exports = router;