const user1 = require("../models/User");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("./sentVerificationEmail");


const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await user1.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists!" });
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with hashed password
    const users = await user1.create({ email, password: hashedPassword, name });


    res.status(201).json({ message: "User registered successfully. Please verify your email." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login user with password comparison
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await user1.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "The password is incorrect" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        token,
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
