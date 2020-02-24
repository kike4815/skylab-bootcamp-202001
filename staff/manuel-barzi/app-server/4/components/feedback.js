module.exports = function(props = {}) {
    const { level, message } = props

    return `<p class="${`feedback feedback--${level}`}">${message}</p>`
}