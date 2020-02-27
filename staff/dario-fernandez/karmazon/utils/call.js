function call(url, options = { method: 'GET' }, callback) {
    const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

    const { method, headers, body } = options

    if(!(URL_REGEX.test(url))) {
        throw new SyntaxError(url + ' is not a valid url')
    }

    const xhr = new XMLHttpRequest

    xhr.open(method, url)

    for(key in headers) {
        xhr.setRequestHeader(key, headers[key])
    }

    xhr.addEventListener('load', function() {

        callback(undefined, {
            content: this.responseText,
            status: this.status
        } )
    })

    xhr.addEventListener('error', () => callback(new Error('Network error')))

    xhr.send(body)
}