const { searchVehicles, retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { query }, session: { token } } = req

    if (token) {
        try {
            retrieveUser(token, (error, user) => {
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                const { name, username } = user

                try {
                    searchVehicles(token, query, (error, vehicles) => {
                        const { session: { acceptCookies } } = req

                        if (error) {
                            logger.error(error)

                            res.redirect('/error')
                        }

                        res.send(App({ title: 'Search', body: Landing({ name, username, query, results: vehicles }), acceptCookies }))
                    })
                } catch (error) {
                    logger.error(error)

                    res.redirect('/error')
                }
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else
        try {
            searchVehicles(undefined, query, (error, vehicles) => {
                const { session: { acceptCookies } } = req

                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                res.send(App({ title: 'Search', body: Landing({ query, results: vehicles }), acceptCookies }))
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
}