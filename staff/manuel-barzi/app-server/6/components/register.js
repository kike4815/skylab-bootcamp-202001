const Feedback = require('./feedback')

module.exports = function (props = {}) {
    const { error } = props

    return `<section class="register">
    <h1>Register</h1>
    <form action="/register" method="POST">
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <button>Send</button>
        ${ error ? Feedback({ level: 'error', message: error }) : ''}
    </form>
    <a href="/login">Login</a>
</section>`
}