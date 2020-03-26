import React, { useEffect } from 'react'
import BikeExp from '../img/bh_aerolight_disc.jpg'
import './Search.sass'
import Item from './Item'
import './Item.sass'




export default function ({ _sails, onGoToCart, _mustlogged, onMount, user, onGoToDetail, _detail }) {
    useEffect(() => {
        onMount()
    }, [])

    debugger
    return <>
        {user && <div className="future-breadcramp">BIENVENIDO {user.name}</div>}
        <div className="body-search">

            <section className='results-container'>
                {/* <div className="results-container__sponsor">
                    <img src={BikeExp} alt="" />
                </div> */}
                <div className="results-container__elements">
                    {_sails && _sails.map((sail, index) => <Item key={sail.id} _sail={sail} onGoToCart={onGoToCart} _mustlogged={_mustlogged} onGoToDetail={onGoToDetail} _detail={_detail}/>)}
                    {/* {!_sails && _inputsearch.map((_inputsearch, index) => <Item key={_inputsearch.id} __inputsearch={_inputsearch} onGoToCart={onGoToCart} _mustlogged={_mustlogged}/>)}      */}

                </div>
            </section>
        </div>
    </>
}