const Feedback = require('./feedback')

module.exports = function (props = {}) {
    const { query = '', warning } = props

    return `<form class="search" action="/search" method="GET">
        <h2>Search</h2>
        <input type="text" name="query" placeholder="criteria" value="${query}" />
        <button type="submit">Search</button>

        ${ warning ? Feedback({ level: 'warning', message: warning }) : ''}
    </form>`
}