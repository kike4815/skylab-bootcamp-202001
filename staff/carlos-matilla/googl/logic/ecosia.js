'use strict';

function ecosia(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    search('https://www.ecosia.org/search?q=' + query, 'div.result.js-result', '.result-title', '.result-title', '.result-snippet', callback);
}