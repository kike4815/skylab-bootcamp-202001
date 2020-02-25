const { call } = require('../utils')
const atob = require('atob')

module.exports=function (token, id, callback) {
    
    if (token){
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')
    }
    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)


    if (token){
    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content), { error: _error } = user

        if (_error) return callback(new Error(_error))

        const { favs = [] } = user

        call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${id}`, undefined, (error, response) => {
            if (error) return callback(error)

            if (response.status === 200) {
                const vehicle = JSON.parse(response.content)

                vehicle && (vehicle.isFav = favs.includes(vehicle.id))


                callback(undefined, vehicle)
            }
        })
    })
    }else {
        call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${id}`, undefined, (error, response) => {
            if (error) return callback(error)

            if (response.status === 200) {
                const vehicle = JSON.parse(response.content)

                callback(undefined, vehicle)
            }
        })
    }
}