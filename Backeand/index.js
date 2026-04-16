require('dotenv').config()
const express = require('express')
const authDatabaseConnection = require('./Config/auth.Config')
const authRouter = require('./Router/auth.Router')
const server = express()


server.use(express.json())
server.use(express.urlencoded())
server.use('/auth',authRouter)
const port = process.env.PORT || 8080
server.listen(port, async() => {
    try {
       await authDatabaseConnection()
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        process.exit(1)
    }
    
})