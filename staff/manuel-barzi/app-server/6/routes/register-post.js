const { registerUser } = require('../logic')
const { App, Register } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password, error => {
            if (error) {
                logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }

            res.redirect('/login')
        })
    } catch (error) {
        logger.warn(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
}