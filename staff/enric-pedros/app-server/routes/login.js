module.exports = (req, res) => {
    const { session: { token } } = req

    if (token) return res.redirect('/')

    const { session: { acceptCookies } } = req

    res.render('login', { acceptCookies })
}