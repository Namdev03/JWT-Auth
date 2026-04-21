const { registerApi,loginApi } = require('../Controller/auth.Controller')

const authRouter = require('express').Router()

authRouter.post('/',registerApi)
authRouter.post('/login',loginApi)
module.exports = authRouter