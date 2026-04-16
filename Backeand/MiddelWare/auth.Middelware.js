const jwt = require('jsonwebtoken')
async function authmiddleware(req, res, next) {
    console.log(req);
    
    // try {
    //     const token = req.headers.authorization.split(' ')[1]

    //     const decoded = await jwt.verify(token, 'qbsud8r4jhr')
       
    //     req.userId = decoded._id;
    //     next()

    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // }
}

module.exports = { authmiddleware }