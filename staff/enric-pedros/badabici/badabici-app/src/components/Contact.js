import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import './Contact.sass'

export default function () {



    return <> 
    <h2>CONTÁCTANOS</h2>
    <div className="container-contact">
        <div className="container-contact__location">
           <div className="location">
              <i className="fa fa-map-marker mapMarker"></i>
              <h4>Nuestra dirección</h4>
              <p className="container-contact__direction">Badabici Sport, Av. Juan XXIII, 4 08930, Sant Adria del Besos Barcelona</p>
           </div>
        </div>
        <div className="container-contact__email">
           <div className="location">
              <i className="fa fa-envelope"></i>
              <h4>Nuestro email</h4>
              <p>contacto@badabicisport.com</p>
           </div>
        </div>
        <div className="container-contact__phone">
           <div className="location">
              <i className="fa fa-phone phoneNum"></i>
              <h4>Nuestro teléfono</h4>
              <p>933811943</p>
           </div>
        </div>
        
     </div>

    </>
}