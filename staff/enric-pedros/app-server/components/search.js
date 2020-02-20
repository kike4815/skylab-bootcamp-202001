'use strict';

function Search(props) {
    var search = document.createElement('form');

    Interactive.call(this, search);

    search.classList.add('search');

    search.innerHTML += '<h2>' + props.title + '</h2>'
        .concat('<input type="text" name="query" placeholder="criteria">')
        .concat('<button type="submit">Search</button>')

    search.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = this.query.value;

        props.onSubmit(query);
    });
}

Search.prototype = Object.create(Interactive.prototype);
Search.prototype.constructor = Search;

Search.prototype.__locateFeedbackInContainer__ = function (feedback) {
    this.container.append(feedback.container);
};