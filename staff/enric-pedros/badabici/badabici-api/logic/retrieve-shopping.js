const { models: { User } } = require('badabici-data')
const { mongoose: { Types: { ObjectId } } } = require('badabici-data')
const { validate } = require('badabici-utils')
const { NotFoundError } = require('badabici-errors')

module.exports = (id) => {
    validate.string(id, 'id')

    return (async()=>{

        const user = await User.findById(id).populate("chart").lean()
        
        if (!user) throw new NotFoundError(`product with id ${id} not found`)
        
        return await user
    })()
}