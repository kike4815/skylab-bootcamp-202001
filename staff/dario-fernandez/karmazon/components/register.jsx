function Register({ onSubmit, onToLogin, error }) {
        return <section className="register"> 
            <div className="register__container">
                <h1 className="register__title">Sign up</h1>
                <form className="register__form" onSubmit={ event => {
                        event.preventDefault()

                        const name = event.target.name.value
                        const surname = event.target.surname.value
                        const username = event.target.username.value
                        const password = event.target.password.value
                
                        const user = {
                            name: name,
                            surname: surname,
                            username: username,
                            password: password
                        }
                        onSubmit(user)
                    }
                }>
                    <input type="text" name="name" className="register__input" placeholder="Name" />
                    <input type="text" name="surname" className="register__input" placeholder="Surname" />
                    <input type="text" name="username" className="register__input" placeholder="Username" />
                    <input type="password" name="password" className="register__input" placeholder="Password" />
                    <button className="register__submit" type="submit">Sign up</button>
                </form>
                <p className="register__cta">
                    Do you have an account yet?
                    <br />
                    <a href="" className="register__cta-link" onClick={ event => {
                        event.preventDefault()
                        
                        onToLogin()
                    }

                    }>Login</a>
                </p>
                {error && <Feedback level='error' message={error} />}
            </div>
        </section>

    // __locateFeedbackInContainer__(feedback) {
    //     var button = this.container.querySelector('button')

    //     this.container.querySelector('form').insertBefore(feedback.container, button)
    // }

    // __removeFeedbackFromContainer__(feedback) {
    //     setTimeout(() => this.container.querySelector('form').removeChild(feedback.container), 3000)
    // }
}
