import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: 'User already exists' });

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ message: 'User registered successfully.' });
    } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
    }
});

// Signin endpoint
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Create a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error during signin' });
    }
});

export default router;
