const { registration, login } = require('../Controller/auth.Controller')
const {authmiddleware} = require('../MiddelWare/auth.Middelware')
const authRouter = require('express').Router()

authRouter.post('/',registration)
authRouter.post('/login',login)
authRouter.get('/admin-only',authmiddleware , (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin-only route!' });
});
module.exports = authRouter