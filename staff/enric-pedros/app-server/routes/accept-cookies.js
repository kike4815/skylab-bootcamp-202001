module.exports = (req, res) => {
    const { session } = req

    session.acceptCookies = true

    session.save(() => res.redirect(req.get('referer')))
}