const { registerApi,loginApi,SendLink,ResetPassword } = require('../Controller/auth.Controller')
const upload = require('../Config/multer.config')
const authRouter = require('express').Router()

authRouter.post('/',upload.single("imagestudent"),registerApi)
authRouter.post('/login',loginApi)
authRouter.get("/sendlink",SendLink)
authRouter.post('/reset-password',ResetPassword)
// authRouter.post('/upload',fileUpload)
module.exports = authRouter