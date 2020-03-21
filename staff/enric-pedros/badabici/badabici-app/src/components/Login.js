 
import React, { useEffect } from 'react'
import './Login.sass'
import Blogo from '../img/Blogo.png'
import Feedback from './Feedback'

export default function ({ onSubmit, onGoToRegister, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(email, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    return <>
  
        <div className="login-box">
            <img className="login-box__blogo" src={Blogo} alt="no funciona"/>
            <h1>Login</h1>
            <form className='login-box__form' onSubmit={handleSubmit}>
                <label id="email">Email</label>
                <input type="text" name="email" placeholder="Enter email"/>

                <label id="password">Password</label>
                <input type="password" name="password" placeholder="Enter Pasword"/>

                <input type="submit" value="Log in"/>

                <a href="">Lost your password?</a><br/>
                <a href="" onClick={handleGoToRegister}>Don't have an account?</a>
                {error && <Feedback message={error} level="warn" />}

            </form>
        </div>
    </>
}

