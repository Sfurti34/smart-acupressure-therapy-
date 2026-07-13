const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  startSession,
  stopSession,
  getHistory,
  getSessionById,
} = require("../controllers/sessionController");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Session route is working!",
  });
});

// Start Therapy
router.post("/start", protect, startSession);

// Stop Therapy
router.post("/stop", protect, stopSession);

// Session History
router.get("/history", protect, getHistory);

// Single Session
router.get("/:id", protect, getSessionById);

module.exports = router;