const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authNewSchema = require('../Model/Auth.Model')
async function registerApi(req, res) {
    const { name, email, password } = req.body
    try {
        const haspasword = await bcrypt.hash(password, 10)
        const register = await authNewSchema.create({
            name,
            email,
            password: haspasword
        })
        res.status(201).json({ message: "register successfully", Data: register })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
async function loginApi(req, res) {
    const { email, password } = req.body
    try {
        const find = await authNewSchema.findOne({ email })
        if (!find) {
         return   res.status(404).json({ message: "user not found" })
        }
        const passwordcompare = await bcrypt.compare(password, find.password)
        if (!passwordcompare) {
          return  res.status(404).json({ message: " email and password not found " })
        }
        const toSend = {
            name: find.name,
            email: find.email,
            password: find.password
        }
        const token = jwt.sign(toSend, process.env.SECRATE_KEY,{
        expiresIn: 60*60*1000
        })
            res.cookie("token", token, {
            httpOnly: true,
            secure: false ,
            maxAge: 60*1000
        })
        res.status(200).json({ message: "login successfully", Data: find, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { registerApi, loginApi }