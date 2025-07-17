const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// --- EMAIL CONFIGURATION ---
// Fill in your Gmail and app password below
const EMAIL_USER = 'your-email@gmail.com'; // TODO: change to your Gmail
const EMAIL_PASS = 'your-app-password';    // TODO: change to your Gmail app password

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { fullName, medicalField, email, password, mobile } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, medicalField, email, password: hashedPassword, mobile });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user: { _id: user._id, email: user.email, fullName: user.fullName } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  // For stateless JWT/localStorage, just return success
  res.status(200).json({ message: 'Logout successful' });
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId, fullName, email, medicalField } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    const user = await User.findByIdAndUpdate(userId, { fullName, email, medicalField }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

// Forgot Password controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No user with that email' });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Construct reset link (adjust frontend URL as needed)
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // --- SEND EMAIL ---
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

// Reset Password controller
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