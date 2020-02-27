const { fetch } = require('../utils')
const atob = require('atob')
require('../utils/array.prototype.toggle')

module.exports = function (token, id) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    if (typeof id !== 'string') throw new TypeError(`id ${id} is not a string`)

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            const user = JSON.parse(response.content), { error: _error } = user

            if (_error) throw new Error(_error)

            const { favs = [] } = user

            favs.toggle(id)

            return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ favs })
            })
        })
        .then(response => {
            if (response.content) {
                const { error } = JSON.parse(response.content)

                if (error) throw new Error(error)
            }
        })
}