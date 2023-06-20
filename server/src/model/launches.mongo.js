const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    flightNumber : {
        type : Number,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    rocket : {
        type: String,
        required : true
    },
    mission : {
        type: String,
        required : true
    },
    target: {
        type: String,
        required: true
    },
    customer: [ String ],
    upcoming : {
        type: Boolean,
        required: true,
        default: true 
    },
    success : {
        type: Boolean,
        required: true,
        default: true 
    },
})

module.exports = mongoose.model('Launch' , schema)
