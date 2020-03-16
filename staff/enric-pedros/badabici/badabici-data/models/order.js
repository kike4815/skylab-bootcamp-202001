const mongoose = require('mongoose')
const { order } = require('../schemas')

module.exports = mongoose.model('Order', order)