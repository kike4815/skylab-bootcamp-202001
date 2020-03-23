
import React from 'react'
import './Landing.sass'


export default function ({ onGoToSails, onGoToSearch }) {
    
    function handleGoToSearch(event) {
        event.preventDefault()

        onGoToSearch()
    }

    return <>
        <div className="landing">
            <header className="landing__container">
                <h1 className="landing__logo">BADABICI</h1>
            </header>

            <div className="landing__section">

                <h3>Elige tu camino</h3>
                <h4>Nosotros te ayudamos</h4>
                <div className="landing__buttons">
                    <a href="#" className="landing__buttons__sails" onClick={onGoToSails}>Ofertas</a>
                    <a href="#" className="landing__buttons__start" onClick={handleGoToSearch}>¿Empezamos?</a>

                </div>
            </div>

        </div>
    </>
}