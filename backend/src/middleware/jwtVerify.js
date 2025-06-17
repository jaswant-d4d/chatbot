const jwt = require('jsonwebtoken');
const clearAuthToken = require('./clearAuthToken');
const User = require('../models/User'); // Adjust path based on your project

const jwtVerify = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : null);
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is missing!.'
            });
        }

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });

        const userId = decoded?.userId;
        if (!userId) {
            clearAuthToken(res)
            return res.status(403).json({
                success: false,
                message: 'Invalid token payload: user ID missing.'
            });
        }

        // Check if user exists
        const user = await User.findById(userId).select('_id name email');
        if (!user) {
            clearAuthToken(res)
            return res.status(401).json({
                success: false,
                message: 'User no longer exists. Please log in again.'
            });
        }

        // Attach to request
        req.user = user;
        req.userId = userId;

        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        clearAuthToken(res);
        return res.status(401).json({
            success: false,
            message:
                err.name === 'TokenExpiredError'
                    ? 'Session expired. Please log in again.'
                    : 'Invalid authentication token.'
        });
    }
};

module.exports = jwtVerify;
