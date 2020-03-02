const { validate } = require('../../utils')
const database = require('../database')

module.exports = (name, schema) => {
    return class Model {
        constructor(data) {
            data && Object.keys(data).forEach(field => this[field] = data[field])
        }

        static get name() {
            return name
        }

        __validateDataAgainstSchema__() {
            Object.keys(this).forEach(field => {
                if (!schema[field]) throw new Error(`invalid field ${field}`)
            })

            Object.keys(schema).forEach(field => {
                const rule = schema[field]
                const value = this[field]

                if (rule.required || value)
                    validate.type(value, field, rule.type)
            })
        }

        static get __collectionName__() { return `${name.toLowerCase()}s` }

        static findOne(criteria) {
            const collection = database.collection(Model.__collectionName__)

            return collection.findOne(criteria)
                .then(result => result ? new Model(result) : null)
        }

        save() {
            this.__validateDataAgainstSchema__()

            const collection = database.collection(Model.__collectionName__)

            const { _id } = this

            return !_id ?
                collection.insertOne(this)
                    .then(result => {
                        this._id = result.insertedId

                        return this
                    })
                :
                collection.updateOne({ _id }, { $set: this })
                    .then(() => this)
        }
    }
}