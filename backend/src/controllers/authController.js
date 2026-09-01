const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER USER
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, age, goals} = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 2. Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

console.log("REGISTER DATA:", {
  name,
  email,
  age,
  goals
});
    // 3. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      goals
    });

    console.log("USER SAVED:", user._id);

    // 4. Generate token
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRE,
  }
);

    // 5. Send response
res.status(201).json({
  success: true,
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    age: user.age,
    goals: user.goals
  },
});

  } catch (error) {
    next(error);
}
};

// LOGIN USER
console.log("===== LOGIN API CALLED =====");
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3. Generate token
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRE,
  }
);

    // 4. Send response
res.status(200).json({
  success: true,
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    age: user.age,
    goals: user.goals
  },
});

  } catch (error) {
    next(error);
}

};

module.exports = {
  registerUser,
  loginUser,
};