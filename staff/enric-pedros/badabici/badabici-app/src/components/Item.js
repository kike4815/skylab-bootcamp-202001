import React, { useEffect, useState } from 'react'
import './Item.sass'
import Mustlogged from './Mustlogged'

export default function ({ _sail, onGoToCart, _mustlogged }) {



    function handleToCart(event) {
        event.preventDefault()

        
        onGoToCart(_sail._id.toString())
    }


    if (_sail) {

        return <div className="container-item">
            <div className="container-item__image">
                <img src="img/bh_aerolight_disc.jpg" alt="" />
            </div>

            <div className="container-item__info">
                <img src={_sail.image} />
                <h3>{_sail.title}</h3>
                <p>{_sail.description}</p>
                <div className="container-item__prices">

                    <p className="container-item__price">{_sail.price}</p>
                    <p className="container-item__discounted">{_sail.price} </p>
                </div>
                
                <div className="container-item__tocart"><a href="" onClick={handleToCart}>Add To Cart</a></div>
                <div>
                {_mustlogged && <Mustlogged />}
                </div>
            </div>
        </div>
    }

}
