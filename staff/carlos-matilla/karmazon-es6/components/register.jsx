function Register({ onSubmit, onToLogin, error }) {


    return <form className="register" onSubmit={ event=>{
        event.preventDefault()
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value
        onSubmit(name, surname, username, password)
    }

    }>
        <h2>Sign-up</h2>
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="surname" placeholder="surname" />
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            {error && <p>{error}</p>}
            <button>Register</button>
            <a href="" onClick={event => {
            event.preventDefault()
            onToLogin()
        }}>Login</a>

    </form>
}












