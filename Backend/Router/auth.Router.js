const { registerApi,loginApi,SendLink,ResetPassword } = require('../Controller/auth.Controller')

const authRouter = require('express').Router()

authRouter.post('/',registerApi)
authRouter.post('/login',loginApi)
authRouter.get("/sendlink",SendLink)
authRouter.post('/reset-password',ResetPassword)
module.exports = authRouter