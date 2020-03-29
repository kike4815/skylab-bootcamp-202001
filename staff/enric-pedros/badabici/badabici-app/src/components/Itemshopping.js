import React from 'react'
import './Itemshopping.sass'


export default ({ shop }) => {

  debugger
  return (
       <>         
    <div className="containerbody__item">
        <div className="containerbody__image">
            <img src={shop.image} className='containerbody__img'/>
        </div>
        <div className='containerbody__all'>
            <div className='containerbody__title'>{shop.title}</div>
            <div className="containerbody__description">{shop.description}</div>
        </div>
    </div>
    
    <div className="containerbody__price">
            {shop.price}
    </div>
    <div className="containerbody__trash">
        <i className="fa fa-trash fa-2x"></i>
    </div>
    </>
  )
}