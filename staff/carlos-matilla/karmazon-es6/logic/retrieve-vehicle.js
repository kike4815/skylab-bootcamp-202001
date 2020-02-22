function retrieveVehicle(id, callback) {
    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${id}`, options={method: 'GET'}, response => {
        if (response instanceof Error) return callback(response)

        if (response.status === 200) {
            var result = JSON.parse(response.content)

            callback(result)
        }
    })
}