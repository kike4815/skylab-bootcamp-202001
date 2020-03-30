import React, { useEffect } from 'react'
import './Register.sass'
import Blogo from '../img/Blogo.png'
import Feedback from './Feedback'

export default function ({ onSubmit, onGoToLogin, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(name, surname, email, password)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <div className="register-box">
        <img className="register-box__blogo" src={Blogo} alt=""/>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label id="name">Name</label>
            <input type="text" name="name" placeholder="Enter Name"/>

            <label id="surname">Surname</label>
            <input type="text" name="surname" placeholder="Enter Surname"/>

            <label id="email">Email</label>
            <input type="text" name="email" placeholder="Enter Email"/>

            <label id="password">Password</label>
            <input type="password" name="password" placeholder="Enter Pasword"/>

            <input type="submit" value="Register"/>

            <a href="">Lost your password?</a><br/>
            <a href="" onClick={handleGoToLogin}>go to Login?</a>
        </form>
        {error && <Feedback message={error} />}
    </div>
}