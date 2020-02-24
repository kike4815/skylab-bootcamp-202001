module.exports = function (props = {}) {
    const { error } = props

    return `<section class="login">
    <h1>Login</h1>
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <button>Send</button>
        ${error ? `<p class="login__error">${error}</p>` : ''}
    </form>
    <a href="/register">Register</a>
</section>`
}