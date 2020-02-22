const users = require('../data/users')

module.exports = function (username) {
    if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)

    const user = users.find(user => user.username === username)

    return user
}