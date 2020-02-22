'use strict';

function bing(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    search('https://www.bing.com/search?q=' + query, 'li.b_algo', 'h2>a', 'h2>a', 'p', callback);
}