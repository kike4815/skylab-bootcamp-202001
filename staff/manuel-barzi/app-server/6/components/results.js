const Item = require('./item')

module.exports = function (props = {}) {
    const { results } = props

    return `<ul class="results">
        ${results.map(item => Item({ item })).join('')}
    </ul>`
}