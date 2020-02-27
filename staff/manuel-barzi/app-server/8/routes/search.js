const { searchVehicles, retrieveUser } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { query }, session: { token } } = req

    try {
        if (token)
            retrieveUser(token)
                .then(user => {
                    const { name, username } = user

                    return searchVehicles(token, query)
                        .then(vehicles => {
                            const { session: { acceptCookies } } = req

                            res.render('landing', { name, username, query, results: vehicles, acceptCookies })
                        })
                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
        else
            searchVehicles(undefined, query)
                .then(vehicles => {
                    const { session: { acceptCookies } } = req

                    res.render('landing', { query, results: vehicles, acceptCookies })
                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
    } catch (error) {
        logger.error(error)

        res.redirect('/error')
    }
}