import React, { useState, useEffect, useContext } from 'react'
import './Confirmout.sass'
import { isLoggedIn, retrieveUser } from '../logic'
import { Context } from './ContextProvider'



export default ({ close, onGoToLogout }) => {
  


  return (
    <div className="bg-modal-alert-logged">
      <div className="modal-content-alert-logged-out" >
        <div className="nav-modal-alert-logged-out" >¿Está seguro que quiere salir?</div>

        <div className='logged-container'>
          <button className='button-ok-alert-logged-out' onClick={(event)=> {close(event); onGoToLogout()}}>Confirmar</button>
          <button className='button-ok-alert-logged-retry' onClick={close}>volver</button>
        </div>

      </div>
    </div>
  )
}