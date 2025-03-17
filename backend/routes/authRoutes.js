const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, phone, address, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ fullName, email, phone, address, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Email already in use" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (email === "admin@gmail.com" && password === "123") {
    return res.json({ role: "admin", message: "Login successful" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  res.json({ role: "user", message: "Login successful" });
});

module.exports = router;
