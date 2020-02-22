function searchVehicles(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=${query}`, options={method: 'GET'}, response => {
        if (response instanceof Error) return callback(response)

        if (response.status === 200) {
            var results = JSON.parse(response.content)

            callback(results)
        }
    })
}