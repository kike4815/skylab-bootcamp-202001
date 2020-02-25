

module.exports=(req, res) => {
    const { session: { username } } = req
    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.render('login',{acceptCookies})
}