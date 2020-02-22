'use strict';

function search(url, resultsSelector, titleSelector, linkSelector, contentSelector, callback) {
    if (typeof url !== 'string') throw new TypeError(url + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('https://skylabcoders.herokuapp.com/proxy?url=' + url, function (response) {
    // call('https://api.codetabs.com/v1/proxy?quest=' + url, function (response) { // DOESNT work with this proxy :/

        if (response instanceof Error) return callback(response);

        if (response.status === 200) {
            var doc = new DOMParser().parseFromString(response.content, 'text/html');

            var items = doc.querySelectorAll(resultsSelector);

            var results = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                var title = item.querySelector(titleSelector);

                if (title) {
                    var result = {};

                    result.title = title.innerText.trim();

                    var link = item.querySelector(linkSelector);

                    if (link)
                        result.link = link.href.trim();

                    var description = item.querySelector(contentSelector);

                    if (description)
                        result.description = description.innerText.trim();

                    results.push(result);
                }

            }

            callback(results);
        }
    });
}