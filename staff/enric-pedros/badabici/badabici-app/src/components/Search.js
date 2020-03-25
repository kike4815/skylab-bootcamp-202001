import React from 'react'
import BikeExp from '../img/bh_aerolight_disc.jpg'
import './Search.sass'
import Item from './Item'
import './Item.sass'




export default function ({  _sails, onGoToCart, _mustlogged }) {

    
    return <>
        <div className="future-breadcramp"></div>
        <div className="body-search">

            <section className='results-container'>
                {/* <div className="results-container__sponsor">
                    <img src={BikeExp} alt="" />
                </div> */}
                <div className="results-container__elements">
                    {_sails && _sails.map((sail, index) => <Item key={sail.id} _sail={sail} onGoToCart={onGoToCart} _mustlogged={_mustlogged}/>)} 
                    
                        
                </div>
            </section>
        </div>
    </>
}