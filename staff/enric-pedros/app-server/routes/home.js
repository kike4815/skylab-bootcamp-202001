const {Login, Home, App} = require('../components')
const {retrieveUser} = require('../logic')


module.exports = (req, res) => {
    const { params: { username }, session: { token } } = req
    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }

        const { username: _username } = user

        if (username === _username) {
            const { name } = user

            const { session: { acceptCookies } } = req

            res.send(App({ title: 'Home', body: Home({ name, username}), acceptCookies }))

        } else res.redirect('/login')
    })
}