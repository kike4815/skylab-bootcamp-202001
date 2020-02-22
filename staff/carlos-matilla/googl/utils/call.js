'use strict';

var URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function call(url, callback) {
    if (typeof url !== 'string') throw new TypeError(url + ' is not a string');
    if (!URL_REGEX.test(url)) throw new SyntaxError(url + ' is not an url');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var xhr = new XMLHttpRequest;

    xhr.open('GET', url);

    xhr.addEventListener('load', function (event) {
        var self = event.target;

        callback({
            //content: this.responseText,
            content: self.responseText,
            //status: this.status
            status: self.status
        });
    });

    xhr.addEventListener('error', function() {
        callback(new Error('Network error'));
    });

    xhr.send();
}