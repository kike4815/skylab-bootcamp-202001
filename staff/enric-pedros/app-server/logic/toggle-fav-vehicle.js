const { call } = require('../utils')
const atob = require('atob')
require('../utils/array.prototype.toggle')

module.exports = function (token, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    if (typeof id !== 'string') throw new TypeError(`id ${id} is not a string`)

    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content), { error: _error } = user

        if (_error) return callback(new Error(_error))

        const { favs = [] } = user

        favs.toggle(id)

        call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ favs })
        }, (error, response) => {
            if (error) return callback(error)

            if (response.content) {
                const { error } = JSON.parse(response.content)

                if (error) return callback(new Error(error))
            }

            callback()
        })
    })
}