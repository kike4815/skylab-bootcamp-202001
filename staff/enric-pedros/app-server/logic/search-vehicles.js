const { fetch } = require('../utils')
const atob = require('atob')

module.exports = function (token, query) {
    if (token) {
        if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

        const [header, payload, signature] = token.split('.')
        if (!header || !payload || !signature) throw new Error('invalid token')

        const { sub } = JSON.parse(atob(payload))

        if (!sub) throw new Error('no user id in token')
    }

    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)

    if (token){
        return fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response =>{
            debugger
            const user = JSON.parse(response.content)
            const { favs = [] } = user
        })
            // call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=${query}`, undefined, (error, response) => {
            //     if (error) return callback(error)

            //     if (response.status === 200) {
            //         const vehicles = JSON.parse(response.content)

            //         vehicles.forEach(vehicle => vehicle.isFav = favs.includes(vehicle.id))

            //         callback(undefined, vehicles)
            //     }
            // })

    }else
        return fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=${query}`, undefined)
        .then(response =>{
            const list = JSON.parse(response.content)
            return list
        })    
}