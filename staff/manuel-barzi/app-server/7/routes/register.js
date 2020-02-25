module.exports = ({ session: { acceptCookies } }, res) => {
    res.render('register', { acceptCookies })
}