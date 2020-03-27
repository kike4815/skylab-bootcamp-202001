import React from 'react'
import './Mustlogged.sass'

export default ({close}) => {

  return (
    <div className="bg-modal-alert-logged">
      <div className="modal-content-alert-logged" >
  <div className="nav-modal-alert-logged" >Debe estar registrado para poder añadir a la lista de la compra</div>
    
        <div>
           <button  className='button-ok-alert-logged' onClick={close}>volver</button>
        </div>

      </div>
    </div>
  )
}