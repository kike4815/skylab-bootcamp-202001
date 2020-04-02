import React from 'react'
import './Footer.sass'
import {  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSkype,faFacebook,faTwitter, faPinterest, faVine} from '@fortawesome/free-brands-svg-icons'

export default function () {


    return <footer className='footer'>
        <div className="footer__top">
            <div className="footer__top__container">
                <h2 className="title_block">Sobre Nosotros</h2>
                <p>Especialidad en carretera de alta competición - MTB - Asesoramiento técnico - mantenimiento y reparación.</p>
            </div>
            <div className="footer__top__container">
                <h2>Información sobre la tienda</h2>
                <ul className="toggle-footer">
                    <li>
                        <div className="ttcontactinfo">Badabici Sport, Av. Juan XXIII, 4 08930, Sant Adria del Besos Barcelona, ESPAÑA</div>
                    </li>
                    <li>
                        <span>93 381 19 43</span></li>
                    <li>
                        <span><a href="mailto:%63%6f%6e%74%61%63%74%6f@%62%61%64%61%62%69%63%69%73%70%6f%72%74.%63%6f%6d">contacto@badabicisport.com</a></span>
                    </li>
                </ul>
            </div>
            <div className="footer__top__container"><h2>Conectate a través de</h2>
                <div className="footer__top__container__social">
                    <a href="#">
                        <FontAwesomeIcon icon={ faTwitter}/>
                    </a>
                    <a href="#">
                        <FontAwesomeIcon icon={ faFacebook}/>
                    </a>
                    <a href="#">
                    <FontAwesomeIcon icon={ faVine}/>
                    </a>
                    <a href="#">
                    <FontAwesomeIcon icon={ faSkype}/>
                    </a>
                    <a href="#">
                    <FontAwesomeIcon icon={ faPinterest}/>
                    </a>
                    <a href="#">
                        <i className="fa fa-rss"></i>
                    </a>
                </div>
            </div>
        </div>

        <div className="footer__down">
            <p className="copyText">Copyright © 2015 by <a href="https://github.com/kike4815">Enric Pedrós</a>. All Rights Reserved.</p>
        </div>
    </footer>

}