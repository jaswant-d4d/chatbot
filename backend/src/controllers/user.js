const User = require('../models/User');
const jwt = require('jsonwebtoken');
const clearAuthToken = require('../middleware/clearAuthToken');


exports.register = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        }

        // Check if email is already registered
        const existingUser = await User.findOne({ email }).select("_id name email ");

        if (existingUser) {
            // User exists - login instead of registering again
            const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, {
                expiresIn: '1y'
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
            });

            return res.status(200).json({ success: true, message: 'User Logged in successfully.', user: existingUser });
        }

        // Optional: check unique phone
        if (phone) {
            const existingPhone = await User.findOne({ phone });
            if (existingPhone) {
                return res.status(409).json({ success: false, message: 'Phone number already used' });
            }
        }

        // Create and save user
        const user = new User({ name, email, phone });
        await user.save();

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1Y'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24 * 365, //1 year 31536000 
        });

        res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });

    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

exports.verifyToken = async (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.userId) {
            clearAuthToken(res);
            return res.status(403).json({ success: false, message: 'Invalid token structure' });
        }

        const user = await User.findById(decoded?.userId).select('-password');
        decoded.name = user.name;

        if (!user) {
            // Clear token if user no longer exists
            clearAuthToken(res);
            return res.status(401).json({ success: false, message: 'User not found or deleted' });
        }

        return res.status(200).json({ success: true, message: 'Token is valid', user: decoded });

    } catch (err) {
        clearAuthToken(res);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}