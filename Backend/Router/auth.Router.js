const { registerApi,loginApi,SendLink } = require('../Controller/auth.Controller')

const authRouter = require('express').Router()

authRouter.post('/',registerApi)
authRouter.post('/login',loginApi)
authRouter.post("/sendlink",SendLink)
module.exports = authRouter