const { authenticateUser } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password)
            .then(token => {
                debugger
                session.token = token

                session.save(() => {
                    const { fav } = session

                    if (fav) return res.redirect(307, `/toggle-fav/${fav}`)

                    res.redirect('/')
                })
            })
            .catch(error => {
                debugger
                logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                res.render('login', { error: message, username, acceptCookies })
            })
    } catch (error) {
        logger.error(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        res.render('login', { error: message, username, acceptCookies })
    }
}