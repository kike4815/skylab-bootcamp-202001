'use strict';

function yahoo(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    search('https://search.yahoo.com/search?q=' + query, 'div.dd.algo.algo-sr.Sr', 'a.ac-algo.fz-l.ac-21th.lh-24', 'a.ac-algo.fz-l.ac-21th.lh-24', 'p.lh-16', callback);
}