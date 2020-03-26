import React from 'react'
import './detail.css'

export default ({close,_detail}) => {


  return (
    <div className="bg-modal-alert" >
      <div className="modal-content-alert" >
  <div className="nav-modal-alert" >{_detail.title}</div>
      <img className='modal-image' src= {_detail.image}/>
        <div>
          <br />
          <h3 className="h3-content">{_detail.description}</h3>

          <button  className='button-ok-alert' onClick={close}>volver</button>
        </div>

      </div>
    </div>
  )
}