import React, { useEffect } from 'react'
import BikeExp from '../img/bh_aerolight_disc.jpg'
import './Search.sass'
import Item from './Item'
import './Item.sass'




export default function ({ _sails, onGoToCart, _mustlogged, onMount, user, onGoToDetail, _detail, _search, searchsale }) {
    useEffect(() => {
        onMount()
    }, [])

    
    return <>
        {user && <div className="future-breadcramp">BIENVENIDO {user.name}</div>}
        <div className="body-search">

            <section className='results-container'>
                {/* <div className="results-container__sponsor">
                    <img src={BikeExp} alt="" />
                </div> */}
                <div className="results-container__elements">
                    {_sails && _sails.map((sail) => <Item key={sail.id} _sail={sail} onGoToCart={onGoToCart} _mustlogged={_mustlogged} onGoToDetail={onGoToDetail} _detail={_detail} searchsale={searchsale}/>)}
                    {_search && _search.map((search) => <Item key={search.id} _search={search} onGoToCart={onGoToCart} _mustlogged={_mustlogged} onGoToDetail={onGoToDetail} _detail={_detail}/>)}

                </div>
            </section>
        </div>
    </>
}