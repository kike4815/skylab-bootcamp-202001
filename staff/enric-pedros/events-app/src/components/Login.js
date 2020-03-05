import React from 'react'


export default function Login({ onLogin, goToRegister }) {



    return (
        <form onSubmit={event => {
            event.preventDefault()
            
            const { email, password } = event.target.value
            onLogin(email, password)
        }}>
            <input type='text' name='email' placeholder='email'></input>
            <input type='password' name='password' placeholder='password'></input>
            <button>Submit</button>

            <a href="" onClick={event => {
                event.preventDefault()
                goToRegister()
            }}> go To Register</a>
        </form>
    )
}