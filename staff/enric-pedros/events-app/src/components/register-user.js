import React from 'react'
import registerUser from '../logic/register-user'

export default function Register() {

function handleRegister(event){
    event.preventDefault()

    const {name,surname,email,password} = event.target
    registerUser(name.value, surname.value, email.value, password.value)

}

    return (
        <form onSubmit={handleRegister}>
            <input type='text' name='name' placeholder='name'></input>
            <input type='text' name='surname' placeholder='surname'></input>
            <input type='text' name='email' placeholder='email'></input>
            <input type='password' name='password' placeholder='password'></input>
            <button>Submit</button>
        </form>
    )

}