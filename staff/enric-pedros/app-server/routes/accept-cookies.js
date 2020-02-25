module.exports = (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
}