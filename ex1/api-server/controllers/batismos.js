var mongoose = require('mongoose')
var Batismo = require('../models/batismo')

module.exports.list = () => {
    return Batismo.find({},{ "date": 1, "title":1, "ref":1, "_id": 1}).exec()
}

module.exports.search = (id) => {
    return Batismo.findOne({ "_id": id}).exec()
}

module.exports.listTitle = () => {
    return Batismo.find({},{"_id": 0, "title":1}).exec()
}

module.exports.progenitores = () => {
    return Batismo.find({},{"_id": 1, "pai":1, "mae":1}).exec()
}

module.exports.listQueryYear = (year) => {
    return Batismo.find({ date : {$regex :  year } })
        .exec()
}

module.exports.listaQueryByYear = () => {
    return Batismo.aggregate([{$group: {_id: {date:"$date", count: {$sum:1}} }}])
        .exec()
}