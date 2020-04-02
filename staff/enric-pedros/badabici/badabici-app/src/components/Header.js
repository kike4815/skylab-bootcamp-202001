import React from 'react'
import './Header.sass'

export default function ({ user, onSubmit, onGoToRegister, onGoToAdmin, onGoToLogin }) {

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
        
    function handleSubmitLi(event) {
        event.preventDefault()
        const value = event.target.id
        onSubmit(`query=${value}`)
    }

return <header className='header'>
    <div className='header__firstcontainer'><a href="" onClick={handleGoToAdmin}><i className="fa fa-bicycle" ></i></a><a href="#">BADABICI</a></div>
    <div className='header__secondcontainer'>
     
            <ul className="nav">
                <li><a href="">categorias</a>
                    <ul>
                        <li><a href="" id='patinetes' onClick={handleSubmitLi}>Patinetes</a></li>
                        <li><a href="" id='accesorios' onClick={handleSubmitLi}>Accesorios</a></li>
                        <li><a href="" id ='componentes' onClick={handleSubmitLi}>Componentes</a></li>
                        <li><a href="">Bicicletas</a>
                            <ul>
                                <li><a href="" id='montaña'  onClick={handleSubmitLi}>Montaña</a></li>
                                <li><a href="" id="carretera" onClick={handleSubmitLi}>Carretera</a></li>
                                <li><a href="" id="triatlon"  onClick={handleSubmitLi}>Triatlon</a></li>
                                <li><a href="" id ='urbanas'  onClick={handleSubmitLi}>urbanas</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
    
            <form className='header__form' action="#" onSubmit={handleSubmit}>    
            <input type="search" id="title" name="title" className='header__form__input' placeholder="  Search" />
            <div className='header__form__button'><i className="fa fa-search"></i></div>

        </form>


    </div>
    <div className='header__thirdcontainer'>
       { !user && <a className='header__loginbutton' href="" onClick={handleGoToLogin}>Login </a>}
       { !user && <a className='header__registerbutton' href="" onClick={handleGoToRegister}> Register</a>}
    </div>
</header>

}