const { fetch } = require('../utils')


module.exports = function (token) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response =>{
        const data = JSON.parse(response.content)
        return data
    })
    // }, (error, response) => {
    //     if (error) return callback(error)

    //     const data = JSON.parse(response.content), { error: _error } = data

    //     if (_error) return callback(new Error(_error))

    //     const { name, surname, username } = data

    //     callback(undefined, { name, surname, username })
    // })
}