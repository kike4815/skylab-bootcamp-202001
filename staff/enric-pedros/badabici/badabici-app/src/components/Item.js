import React, { useEffect } from 'react'
import './Item.sass'

export default function ({ _sails }) {


    return  <div class="container-item">
    <div class="container-item__image">
        <img src="img/bh_aerolight_disc.jpg" alt=""/>
    </div>

    <div class="container-item__info">
        <h3>TITULO</h3>
        <p>DESCRIPCIÓN</p>
        <div class="container-item__prices">

            <p class="container-item__price">PRECIO</p>
            <p class="container-item__discounted">DESCUENTO €</p>
        </div>

        <div class="container-item__tocart"><a href="#">Add To Cart</a></div>

    </div>
</div>  

}