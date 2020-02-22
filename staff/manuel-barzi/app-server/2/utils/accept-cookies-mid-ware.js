module.exports = function(req, res, next) {
    const { cookies: { ['accept-cookies'] : acceptCookies } } = req

    req.acceptCookies = Boolean(acceptCookies)

    next()
}