import React, { useEffect } from 'react'
import './Header.sass'

export default function ({ onSubmit, onGoToRegister, onGoToAdmin, onGoToLogin }) {

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }
    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    function handleGoToAdmin(event) {
        event.preventDefault()

        onGoToAdmin()
    }
    function handleSubmit(event) {
        event.preventDefault()
        const {value} = event.target.title
        onSubmit(`query=${value}`)
    }
        
    

return <header className='header'>
    <div className='header__firstcontainer'><a href="" onClick={handleGoToAdmin}><i className="fa fa-bicycle" ></i></a><a href="#">BADABICI</a></div>
    <div className='header__secondcontainer'>
        <form className='header__form' action="#" onSubmit={handleSubmit}>

            <ul className="nav">
                <li><a href="">categories</a>
                    <ul>
                        <li><a href="">Patinetes</a></li>
                        <li><a href="">Accesories</a></li>
                        <li><a href="">Components</a></li>
                        <li><a href="">Bicicletas</a>
                            <ul>
                                <li><a href="">Montaña</a></li>
                                <li><a href="">Carretera</a></li>
                                <li><a href="">Triatlon</a></li>
                                <li><a href="">urbanas</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <input type="search" id="title" name="title" className='header__form__input' placeholder="  Search" />
            <div className='header__form__button'><i className="fa fa-search"></i></div>

        </form>


    </div>
    <div className='header__thirdcontainer'>
        <a className='header__loginbutton' href="" onClick={handleGoToLogin}>Login </a>
        <a className='header__registerbutton' href="" onClick={handleGoToRegister}> Register</a>
    </div>
</header>

}