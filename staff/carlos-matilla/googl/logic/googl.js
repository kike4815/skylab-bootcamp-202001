'use strict';

function googl(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    search('https://www.google.com/search?q=' + query, 'div.g', 'h3.LC20lb', '.rc>.r>a', 'span.st', callback);
}