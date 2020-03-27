import React from 'react'
import './detail.css'

export default ({message, close}) => {

  return (
    <div className="bg-modal-alert" onClick={close} >
      <div className="modal-content-alert" >
  <div className="nav-modal-alert" >ERROR</div>
    
        <div>
          <br />
          <h3 className="h3-content">{message}</h3>

          <button  className='button-ok-alert' onClick={close}>OK</button>
        </div>

      </div>
    </div>
  )
}