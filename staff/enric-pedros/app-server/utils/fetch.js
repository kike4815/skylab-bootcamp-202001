const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

module.exports = function (url, options = {}) {
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