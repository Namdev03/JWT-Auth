const jwt = require('jsonwebtoken')
async function authmiddleware(req,res,next) {
    const token = req.body.token
    try {
        const decoded = await jwt.verify(token,'qbsud8r4jhr')
        console.log("decoded",decoded);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {authmiddleware}