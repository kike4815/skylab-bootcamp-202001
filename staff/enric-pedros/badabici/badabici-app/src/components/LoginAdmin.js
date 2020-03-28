
import React, { useEffect } from 'react'
import './LoginAdmin.sass'
import Blogo from '../img/Blogo.png'
import Feedback from './Feedback'

export default function ({ onSubmit, error, onGoToSearch}) {
   
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

            <form action="" method="" className="formadmin" onSubmit={handleSubmit}>
                <div className="imgcontainer">
                    <img src={Blogo} alt="Avatar" className="avatar"/>
                </div>

                    <div className="container-inputs">
                        <label name="email"><b>Email</b></label>
                        <input type="text" className='container-inputs__text' placeholder="Enter Email" name="email" required/>

                            <label name="password"><b>Password</b></label>
                            <input type="password" className='container-inputs__password' placeholder="Enter Password" name="password" required/>

                                <a type="submit" className='button-login'/* onSubmit={handleSubmit} */>Login</a>

                    </div>
                    {error && <Feedback message={error} level="warn" />}


                            <div className="container-links">
                                <span className="psw">Forgot <a href="#" className="forgot">password?</a></span>
                                <span className="psw"><a href="#" className="goBack" onClick={handleGoToSearch}>Go Back</a></span>
                            </div>
    
            </form>
        </>
}