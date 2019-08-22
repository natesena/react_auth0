const
    Mongoose = require('mongoose')

VisitorSchema = new Mongoose.Schema({
    ipAddress:{type: String, default: '0.0.0.0', required: true}
})

var Visitor = Mongoose.model('Visitor', VisitorSchema)

module.exports = Visitor