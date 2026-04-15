require('dotenv').config()
const express = require('express')
const authDatabaseConnection = require('./Config/auth.Config')
const server = express()




const port = process.env.PORT || 8080
server.listen(port, async() => {
    try {
       await authDatabaseConnection()
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        process.exit(1)
    }
    
})