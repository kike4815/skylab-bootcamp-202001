const { validate } = require('../../utils')

module.exports = class Model {
    constructor(data, schema) {
        Object.keys(data).forEach(field => {
            if (!schema[field]) throw new Error(`invalid field ${field}`)
        })

        Object.keys(schema).forEach(field => {
            const type = schema[field]
            const value = data[field]

            validate.type(value, field, type)

            this[field] = value
        })
    }
}