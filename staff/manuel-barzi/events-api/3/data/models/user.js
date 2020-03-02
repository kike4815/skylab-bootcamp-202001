const model = require('./model')
const { user } = require('../schemas')

module.exports = model('User', user)