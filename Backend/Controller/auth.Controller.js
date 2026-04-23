require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authNewSchema = require('../Model/Auth.Model');
const { sendMail } = require('../Config/Nodemail.Config');
async function registerApi(req, res) {
  const { name, email, password } = req.body;

  try {
    console.log("working 1", password)
    const name = req.body
    const file = req.file
    console.log("file", file);

    const payload = { ...req.body }

    if (file) {
      const imageUrl = `http://localhost:9000/${req.file.destination}/${req.file.fileName}`
      payload.image = imageUrl
    }


    const haspassword = await bcrypt.hash(password, 10);
    console.log("working 2")

    payload.password = haspassword

    const register = await authNewSchema.create(payload);
    console.log("working 3")

    res.status(201).json({
      message: "register successfully",
      Data: register
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function loginApi(req, res) {
  console.log("login started")
  const { email, password } = req.body
  try {
    const find = await authNewSchema.findOne({ email })
    if (!find) {
      return res.status(404).json({ message: "user not found" })
    }
    const passwordcompare = await bcrypt.compare(password, find.password)
    if (!passwordcompare) {
      return res.status(404).json({ message: " email and password not found " })
    }
    const toSend = {
      name: find.name,
      email: find.email,
      password: find.password
    }
    console.log("key", process.env.SECRATE_KEY)
    const token = jwt.sign(toSend, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 1000
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000
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
      find.email, "passwors resentlink", `click on blow link to reset your password\n http://localhost:5173/reset-password/${token} `
    )
    res.status(200).json({
      message: "Password reset link sent to your email"
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
async function ResetPassword(req, res) {
  const { token, password } = req.body
  console.log(token);

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY)

    if (!decode) {
      return res.status(404).json({ message: "token not found" })
    }
    const admin = await authNewSchema.findOne({ email: decode.email })

    if (!admin) {
      return res.status(404).json({ message: "User not found" })
    }
    if (admin.token !== token) {
      return res.status(401).json({ message: "Invalid or already used token" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    admin.password = hashedPassword
    admin.token = undefined

    await admin.save()

    res.status(200).json({ message: "Password changed successfully" })

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}
// async function fileUpload(req, res) {

//   try {
//     const name = req.body
//     const file = req.file
//     const payload = `http://localhost:9000/${req.file.destination}/${req.file.fileName}`
//     file.imagestudent = payload
//     res.status(201).json({ message: "upload Successfully" })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
module.exports = { registerApi, loginApi, SendLink, ResetPassword } 