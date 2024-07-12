const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Save user to database
    res.status(201).json({ message: 'User registered successfully', username: username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Successful login
    res.status(200).json({ message: `Welcome, ${username}!`, username: username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;