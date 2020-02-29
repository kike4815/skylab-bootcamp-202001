const Model = require('./model')
const { user } = require('../schemas')

module.exports = class User extends Model {
    /**
     * Builds an user instance
     * 
     * @param {Object} data user data (name, surname, email, password)
     */
    constructor(data) {
        super(data, user)

        this.created = new Date
    }
}