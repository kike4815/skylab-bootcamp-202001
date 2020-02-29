const Model = require('./model')
const { event } = require('../schemas')

module.exports = class Event extends Model {
    /**
     * Builds an event instance
     * 
     * @param {Object} data event data (title, description, date, location, published)
     */
    constructor(data) {
        super(data, event)

        this.created = new Date
    }
}