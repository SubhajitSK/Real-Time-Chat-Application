const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists. Choose a different one or login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "QBH$23&1", {
      expiresIn: "1h",
    });

    res.status(201).json({ token, username });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    const token = jwt.sign({ userId: existingUser._id }, "QBH$23&1", {
      expiresIn: "1h",
    });

    res.status(200).json({ token, username });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
