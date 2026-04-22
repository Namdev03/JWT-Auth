require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authNewSchema = require('../Model/Auth.Model');
const { sendMail } = require('../Config/Nodemail.Config');
async function registerApi(req, res) {
    const { name, email, password } = req.body;

    try {
        const haspasword = await bcrypt.hash(password, 10);

        const register = await authNewSchema.create({
            name,
            email,
            password: haspasword
        });

        // const token = jwt.sign(
        //     { id: register._id, email: register.email },
        //     process.env.SECRATE_KEY,
        //     { expiresIn: "1d" }
        // );

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: false, 
        //     maxAge: 24 * 60 * 60 * 1000
        // });

        res.status(201).json({
            message: "register successfully",
            Data: register
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
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
async function SendLink(req, res) {
  try {
    const find = await authNewSchema.findOne({ email: req.query.email })   
    if (!find) {
      return res.status(404).json({ message: "Email not found" })
    }
    const token = jwt.sign(
      { _id: find._id, email: find.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    )
    find.token = token
    await find.save()
   
    // TODO: send email with link
    // http://localhost:5173/reset-password/${token}
   sendMail(
  find.email,"passwors resentlink",`click on blow link to reset your password\n http://localhost:5173/reset-password/${token} `
   )
    res.status(200).json({
      message: "Password reset link sent to your email"
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
async function ResetPassword(req,res) {
  const {token,password} = req.body
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
          res.status(401).json({message:"invalid or expired link"})
        } 
         const admin = await authNewSchema.findOne(decode.email)
         if (!admin) {
          res.status(404).json({message:"notfound"})
         }
         const haspassword = await bcrypt.hash(password,10)
         const update = await authNewSchema.findByIdAndUpdate(admin._id,{password:haspassword}) 
      admin.token = undefined
      await admin.save()
         res.status(200).json({message:"password changed successfully"})
    } catch (error) {
    res.status(500).json({ message: error.message })
        
    }
}
module.exports = { registerApi, loginApi,SendLink,ResetPassword } 