const { toggleFavVehicle } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { id }, session } = req

    const { token } = session

    if (!token) {
        session.referer = req.get('referer')

        session.fav = id

        return session.save(() => res.redirect('/login'))
    }

    try {
        toggleFavVehicle(token, id, error => {
            if (error) {
                logger.error(error)

                res.redirect('/error')
            }

            const { referer = req.get('referer') } = session

            delete session.referer
            delete session.fav

            session.save(() => res.redirect(referer))
        })
    } catch (error) {
        logger.error(error)

        res.redirect('/error')
    }
}