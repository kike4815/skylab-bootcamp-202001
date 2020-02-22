function Login({ onSubmit, onToRegister, error }) {

    const onSubmitLogin = event =>{
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        onSubmit(username, password)
    }
    return <form className="login" onSubmit={onSubmitLogin}>
        <h2>Sign-in</h2>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        {error && <p>{error}</p>}
        <button>Login</button>
        <a href="" onClick={ event => {
            event.preventDefault()

            onToRegister()
        }}>Register</a>

    </form>
}