module.exports = ({ session }, res) => {
    session.destroy(() => res.redirect('/'))
}