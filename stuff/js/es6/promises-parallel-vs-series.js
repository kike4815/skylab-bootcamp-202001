/*
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function call(url, options = {}, callback) {
    if (typeof url !== 'string') throw new TypeError(`${url} is not a string`)
    if (!URL_REGEX.test(url)) throw new SyntaxError(`${url} is not an url`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const xhr = new XMLHttpRequest

    const { method = 'GET', headers, body } = options

    xhr.open(method, url)

    for (const key in headers)
        xhr.setRequestHeader(key, headers[key])

    xhr.addEventListener('load', function () {
        callback(undefined, {
            content: this.responseText,
            status: this.status
        })
    })

    xhr.addEventListener('error', () => callback(new Error('network error')))

    xhr.send(body)
}

call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=fiat', undefined, (error, results) => {
    if (error) return console.error(error.message)

    const vehicles = JSON.parse(results.content)

    console.log(vehicles)

    let count = 0

    vehicles.forEach((vehicle, index) => {
        const { id } = vehicle

        call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + id, undefined, (error, results) => {
            if (error) return console.error(error.message)

            const vehicle = JSON.parse(results.content)

            vehicles[index] = vehicle

            if (++count === vehicles.length)
                vehicles.forEach(vehicle => console.log(vehicle))
        })
    })
})
*/

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function call(url, options = {}) {
    if (typeof url !== 'string') throw new TypeError(`${url} is not a string`)
    if (!URL_REGEX.test(url)) throw new SyntaxError(`${url} is not an url`)

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest

        const { method = 'GET', headers, body } = options

        xhr.open(method, url)

        for (const key in headers)
            xhr.setRequestHeader(key, headers[key])

        xhr.addEventListener('load', function () {
            resolve({
                content: this.responseText,
                status: this.status
            })
        })

        xhr.addEventListener('error', () => reject(new Error('network error')))

        xhr.send(body)
    })
}

// parallel

call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=fiat') // theneable ~ Promise
    .then(results => JSON.parse(results.content))
    .then(vehicles => { console.log(vehicles); return vehicles })
    .then(vehicles => vehicles.map(vehicle => call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + vehicle.id)))
    .then(calls => Promise.all(calls))
    .then(results => results.map(result => JSON.parse(result.content)))
    .then(vehicles => vehicles.forEach(vehicle => console.log(vehicle)))
    .catch(error => console.error(error.message))

// series

call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=gold') // theneable ~ Promise
    .then(results => JSON.parse(results.content))
    .then(vehicles => { console.log(vehicles); return vehicles })
    .then(vehicles => {
        let calls = Promise.resolve()

        vehicles.forEach(vehicle => calls = calls
            .then(() => call('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + vehicle.id))
            .then(result => JSON.parse(result.content))
            .then(vehicle => console.log(vehicle))
        )

        return calls
    })
    .catch(error => console.error(error.message))
    .then(() => console.log('ended'))