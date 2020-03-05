const { searchVehicles, retrieveUser } = require('../logic')
const { logger } = require('events-utils')

module.exports = (req, res) => {
    const { query: { query }, session: { token } } = req

    if (token) {
        try {
            retrieveUser(token)
                .then(user => {
               

                const { name, username } = user

                try {
                    searchVehicles(token, query)
                    .then(vehicles => {
                        const { session: { acceptCookies } } = req

                        res.render('landing', { name, username, query, results: vehicles, acceptCookies })
                    }).catch(()=>{
                        logger.error(error)

                        res.redirect('/error')
                        
                    })
                } catch (error) {
                    logger.error(error)

                    res.redirect('/error')
                }
            }).catch(()=>{ 
                logger.error(error)
                res.redirect('/error')
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else
        try {

            searchVehicles(undefined, query)
                .then(results => {
                    const { session: { acceptCookies } } = req
                    res.render('landing', { query, results, acceptCookies })

                })

        } catch (error) {
            logger.error(error)
            res.redirect('/error')
        }
}