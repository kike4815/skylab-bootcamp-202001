const mongoose = require('mongoose')
const { event } = require('../schemas')

module.exports = mongoose.model('Event', event)