import React from 'react'
import './Buyit.sass'

export default ({close}) => {

  return (
    <div className="bg-modal-alert-buyit">
      <div className="modal-content-alert-buyit" >
  <div className="nav-modal-alert-buyit" >Felicidades!!le llegará un correo electrónico con el recibo de compra</div>
    
        <div>
           <button  className='button-ok-alert-buyit' onClick={close}>Cerrar</button>
        </div>

      </div>
    </div>
  )
}