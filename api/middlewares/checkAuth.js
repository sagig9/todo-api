
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    console.log("Request Headers:", req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded; // Attach user data to request object
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Authentication failed. Please log in again." });
    }
};

module.exports = checkAuth;