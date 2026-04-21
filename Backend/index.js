require('dotenv').config()
const express = require('express');
const cookie = require('cookie-parser')
const cors = require('cors')
const mongoDBConnection = require('./Config/Auth.Config');
const authRouter = require('./Router/auth.Router');
const authMiddelWare = require('./MiddelWare/auth.Middelware');
const app = express();
//=========middelWares========
app.use(express.json())
app.use(express.urlencoded())
app.use(cookie())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
//=========listen========
app.use('/auth', authRouter)
app.get("/test", authMiddelWare, (req, res) => {
    res.send("access granted")
})
const port = process.env.PORT
app.listen(port, async () => {
    try {
        await mongoDBConnection()
        console.log(`server is live on ${port}`);

    } catch (error) {
        process.exit(true)
    }
})
