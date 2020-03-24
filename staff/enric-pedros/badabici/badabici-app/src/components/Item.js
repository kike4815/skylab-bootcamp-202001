import React, { useEffect, useState } from 'react'
import './Item.sass'

export default function ({ _sail, onGoToCart }) {

    function handleToCart(event) {
        event.preventDefault()
        // MIRAR SI ES _id o id
        onGoToCart(_sail._id.toString())
    }

    //////
    // const [discounts, setDiscounts] = useState(false)

    // {onClick={e => {
    //     e.preventDefault()
    //     setDiscounts(!discounts)
    // }}}    

    // {discounts && _sail.map(sail => <Item /> )}
    // {!discounts && products.map(product => <Item /> )}
    //////

    return  <div className="container-item">
    <div className="container-item__image">
        <img src="img/bh_aerolight_disc.jpg" alt=""/> 
    </div> 

    <div className="container-item__info">
        <img src ={_sail.image}/>
        <h3>{_sail.title}</h3>
        <p>{_sail.description}</p>
        <div className="container-item__prices">

            <p className="container-item__price">{_sail.price}</p>
            <p className="container-item__discounted">{_sail.price} €</p>
        </div>

        <div className="container-item__tocart"><a href="#" onClick={handleToCart}>Add To Cart</a></div>

    </div>
</div>  

}
