const { call } = require('../utils')

module.exports = function (username, password, callback) {
    if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }, (error, response) => {
        if (error) return callback(error)

        const { error: _error, token } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))

        callback(undefined, token)
    })
}