const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validation");


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Authentication
 *     responses:
 *       201:
 *         description: User registered successfully
 */

// REGISTER API
router.post("/register", validateRegister, registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login successful
 */
// LOGIN API
router.post("/login", validateLogin, loginUser);

// Export router
module.exports = router;