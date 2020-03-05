import React from 'react'


export default function Register({onSubmit, setView}) {

function handleRegister(event){ //MAYBE??? INSIDE OF FORM BETTER
    event.preventDefault()

    const {name,surname,email,password} = event.target
    onSubmit(name.value, surname.value, email.value, password.value)

}

    return (
        <form onSubmit={handleRegister}>
            <input type='text' name='name' placeholder='name'></input>
            <input type='text' name='surname' placeholder='surname'></input>
            <input type='text' name='email' placeholder='email'></input>
            <input type='password' name='password' placeholder='password'></input>
            <button>Submit</button>

            <a href="" onClick={event=>{
                event.preventDefault()
                setView('Login')
            }}> go To Login</a>
        </form>
    )

}