import React, { useState } from 'react'
import './Itemshopping.sass'
import { Redirect } from 'react-router-dom'


export default ({ shop,onGoToCart }) => {
const [redirect,setRedirect]=useState(false)


    function handleGoToCart(event){
        event.preventDefault()
        setRedirect(true)
        onGoToCart(shop._id.toString())
        
    }
    debugger
 if(redirect)return <Redirect to = '/listshopping'/> 

    shop.price = Number(shop.price).toFixed(2)
    

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
            {shop.price} €
    </div>
    <div className="containerbody__trash">
        <a href='#'><i className="fa fa-trash fa-2x" onClick={handleGoToCart}></i></a>
    </div>
    </>
  )
}