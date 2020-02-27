const { retrieveUser } = require('../logic')
const { logger } = require('../utils')

module.exports = ({ session: { token, acceptCookies } }, res) => {
    if (token) {
        try {
            retrieveUser(token)
                .then(user => {
                    const { name, username } = user

                    res.render('landing', { name, username, acceptCookies })
                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else res.render('landing', { acceptCookies })
}