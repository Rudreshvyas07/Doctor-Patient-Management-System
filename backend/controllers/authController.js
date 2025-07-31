const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// --- EMAIL CONFIGURATION ---
const EMAIL_USER = 'your-email@gmail.com'; // ✅ Change this
const EMAIL_PASS = 'your-app-password';    // ✅ Change this

// --- SIGNUP ---
exports.signup = async (req, res) => {
  try {
    const { fullName, medicalField, email, password, mobile, code } = req.body;

    if (!code || String(code).length !== 4 || isNaN(code)) {
      return res.status(400).json({ message: 'Code must be a 4-digit number' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const existingCode = await User.findOne({ code });
    if (existingCode) return res.status(400).json({ message: 'This code is already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      medicalField,
      email,
      password: hashedPassword,
      mobile,
      code,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        code: user.code
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.error(err);
  }
};

// --- LOGOUT ---
exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

// --- UPDATE PROFILE ---
exports.updateProfile = async (req, res) => {
  try {
    const { userId, fullName, email, medicalField } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID required' });

    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, email, medicalField },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated', user });

  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

// --- FORGOT PASSWORD ---
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No user with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      text: `Reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset link sent to your email.' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --- RESET PASSWORD ---
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
