const mongoose = require('mongoose')

async function mongoDBConnection (){
    try {
         const connection  = mongoose.connect(process.env.URI)
         console.log(`data base connected successfully`);
         
    } catch (error) {
        throw new Error(error);
        
    }
}
module.exports = mongoDBConnection