var mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    date: String,
    title: String,
    ref: String,
    href: String,
    _id: String,
    pai: String,
    mae: String
})

module.exports = mongoose.model('batismos', batismoSchema)