const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    keplerName: {
        type: String,
        require:true
    }
})

module.exports = mongoose.model('Planet' , schema)