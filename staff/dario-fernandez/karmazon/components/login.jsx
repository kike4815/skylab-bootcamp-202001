function Login({onSubmit, onToRegister, error}){
        return <section className="login">
            <div className="login__container">
                <h3 className="login__title">
                    Login
                </h3>
                <form className="login__form" onSubmit={ event => {
                    event.preventDefault()
                    
                    const username = event.target.username.value
                    const password = event.target.password.value
        
                    onSubmit({ username, password })
                    }
                }>
                    <input type="text" className="login__input" name="username" placeholder="Username" />
                    <input type="password" className="login__input" name="password" placeholder="Password" />
                    <button type="submit" className="login__submit">
                        Login
                    </button>
                </form>
                <p className="login__register-cta">
                    Don't have an account yet?
                    <br />
                    <a href="" className="login__cta-link" onClick={ event => {
                        event.preventDefault()

                        onToRegister() 
                        }
                    }>Sign up</a>
                </p>
                    {error && <Feedback level='error' message={error} />}
            </div>
        </section> 
}
