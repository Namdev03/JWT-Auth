const {Schema,model} = require('mongoose')
const authSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    timeseries:true
})
module.exports = model('authentication',authSchema)