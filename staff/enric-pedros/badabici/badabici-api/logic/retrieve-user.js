const { validate } = require('badabici-utils')
const { models: { User } } = require('badabici-data')
const { NotFoundError } = require('badabici-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            return user
            
        })
        .then(({ name, surname, email,chart,orders }) => ({ name, surname, email,chart, orders }))
        
}