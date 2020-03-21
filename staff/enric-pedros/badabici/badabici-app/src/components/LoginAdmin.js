
import React, { useEffect } from 'react'
import './Login.sass'
import Blogo from '../img/Blogo.png'
import Feedback from './Feedback'

export default function ({ onSubmit, error, onGoToSearch }) {
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
    function handleGoToSearch(event) {
        event.preventDefault()

        onGoToSearch()
    }

    return <>
            <h2>WELCOME ADMIN</h2>

            <form action="" method="" className="formadmin">
                <div className="imgcontainer">
                    <img src={Blogo} alt="Avatar" className="avatar"/>
                </div>

                    <div className="container-inputs">
                        <label for="email"><b>Email</b></label>
                        <input type="text" className='container-inputs__text' placeholder="Enter Email" name="email" required/>

                            <label for="password"><b>Password</b></label>
                            <input type="password" className='container-inputs__password' placeholder="Enter Password" name="password" required/>

                                <button type="submit" onSubmit={handleSubmit}>Login</button>

                    </div>
                    {error && <Feedback message={error} level="warn" />}


                            <div className="container-links">
                                <span className="psw">Forgot <a href="#" className="forgot">password?</a></span>
                                <span className="psw">Forgot <a href="#" className="goBack" onSubmit={handleGoToSearch}>Go Back</a></span>
                            </div>
    
            </form>
        </>
}