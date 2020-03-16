const mongoose = require('mongoose')
const { product } = require('../schemas')

module.exports = mongoose.model('Product', product)