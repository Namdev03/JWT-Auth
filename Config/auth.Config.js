const mongoose = require('mongoose');

async function authDatabaseConnection() {
    try {
 await mongoose.connect(process.env.URI)
 console.log('data base succesfully connected');
 
    } catch (error) {
        throw new Error(error);

    }
}
module.exports = authDatabaseConnection;