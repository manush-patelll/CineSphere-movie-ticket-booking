const express = require("express")

const protectRoute = new express.Router();

protectRoute.get("/", (req, res) => {
    // 1. Get token from cookie
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // 2. Verify token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: `Hello user ${decoded.userId}`, user: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
})

module.exports = protectRoute
