const { App, Login } = require('../components')

module.exports = (req, res) => {
    const { session: { token } } = req

    if (token) return res.redirect('/')

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
}