const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

module.exports = {
    register: async (req, res) => {
        const { email, password, confirmPassword } = req.body;

        try {
            if (!email || !password || !confirmPassword) {
                return res.status(400).json({ message: 'Email, password, and confirm password are required.' });
            }

            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message: 'Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.'
                });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already exists.' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                password: hashedPassword
            });

            await user.save();

            res.status(201).json({
                message: 'User registered successfully.',
                token: jwt.sign(
                  { id: user._id, email: user.email },
                  process.env.JWT_KEY,
                  { expiresIn: '1h' }
                ),
                user: {
                  id: user._id,
                  email: user.email
                }
              });
              
        } catch (error) {
            console.error('Registration Error:', error.message);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Authentication failed.' });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Authentication successful.',
                token,
                user: {
                    id: user._id,
                    email: user.email
                }
            });
              
        } catch (error) {
            console.error('Login Error:', error.message);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },

    isAlive: (req, res) => {
        res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
    },

};
