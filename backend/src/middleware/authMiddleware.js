const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      console.log("Received Header:", req.headers.authorization);

token = req.headers.authorization.split(" ")[1];
console.log("Extracted Token:", token);

console.log("JWT Secret:", process.env.JWT_SECRET);

const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("Decoded Token:", decoded);

      // 4. Get user from DB (remove password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // allow access

    } 

    catch (error) {
  console.log("JWT ERROR:", error.message);

  return res.status(401).json({
    message: "Not authorized, token failed",
    error: error.message,
  });
}

  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;