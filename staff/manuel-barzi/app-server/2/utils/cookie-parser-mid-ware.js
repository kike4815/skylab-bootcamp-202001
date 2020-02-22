module.exports = (req, res, next) => {
    const { headers: { cookie = '' } } = req

    req.cookies = cookie.split(';').map(keyValue => keyValue.trim()).reduce((accum, keyValue) => {
        const [key, value] = keyValue.split('=')

        key && value && (accum[key] = value)

        return accum
    }, {})

    next()
}