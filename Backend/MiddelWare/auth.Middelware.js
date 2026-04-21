require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authMiddelWare(req, res, next) {
    try {
        const token = req.cookies.token;


        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRATE_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "No token provided" });
        }
        req.user = decoded; // 
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddelWare;