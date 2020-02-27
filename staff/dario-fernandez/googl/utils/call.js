function call(url, callback) {
    var URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

    if(!(URL_REGEX.test(url))) {
        throw new SyntaxError('not-an-url is not a valid url')
    }

    var xhr = new XMLHttpRequest

    xhr.open('GET', url)

    xhr.addEventListener('load', function() {
        callback( {
            content: this.responseText,
            status: this.status
        } )
    })

    xhr.addEventListener('error', function() {
        callback(new Error('Network error'))
    })

    xhr.send()
}