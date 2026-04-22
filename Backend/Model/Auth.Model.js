const { Schema, model } = require('mongoose')

const authNewSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    token:{
        type:String
    }

},
    {
        timeseries: true,
        timestamps: true
    })
module.exports = model('Auth', authNewSchema)