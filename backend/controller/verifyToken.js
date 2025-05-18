const jwt = require("jsonwebtoken");

const userVerify = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ token: false, valid: false }); // ✅ return added
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verifyfied")
        console.log(decoded)
        return res.json({ valid: true, user: decoded, isAdmin: decoded.isAdmin }); // ✅ return added
    } catch (err) {
        return res.status(401).json({ valid: false }); // ✅ return added
    }
};

module.exports = { userVerify };
