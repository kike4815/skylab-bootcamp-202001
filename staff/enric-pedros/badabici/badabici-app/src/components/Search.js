import React, { useEffect, useState,useContext } from 'react'
import BikeExp from '../img/bh_aerolight_disc.jpg'
import './Search.sass'
import Item from './Item'
import './Item.sass'
import {  isLoggedIn, retrieveUser } from '../logic' 
import { Context } from './ContextProvider'



export default function ({ _sails, onGoToCart, _mustlogged, onMount, user, onToSails, onGoToDetail, _detail, _search, searchsale }) {
    const [newsails, setNewsails] = useState(_sails)
    const [newsearch, setNewsearch] = useState(_search)
    const [_user, setUser] = useState()
    const [state, setState] = useContext(Context) 

    useEffect(() => {
        onMount()
    },[])
    useEffect(() => {
        if (isLoggedIn()){
        (async () => {
            try {
              const _user = await retrieveUser() 
              setUser(_user)
            } catch ({ message }) {
              setState({ ...state, error: message })
              setTimeout(() => setState({...state, error:undefined}), 3000)            
            }
        })()
        }else { 
            setUser(undefined)}
    }, [])

    useEffect(() => { 
        if (_sails) setNewsails(_sails) 
        else if (_search) setNewsearch(_search) 
    },[])
    

    return <>
        {_user && <div className="future-breadcramp"><i className="fa fa-bicycle"></i> Bienvenido {_user.name} <i className="fa fa-bicycle"></i></div>}
        <div className="body-search">

            <section className='results-container'>
                {/* <div className="results-container__sponsor">
                    <img src={BikeExp} alt="" />
                </div> */}
                <div className="results-container__elements">
                    {_sails && _sails.map((sail) => <Item key={sail.id} _sail={sail} onGoToCart={onGoToCart} _mustlogged={_mustlogged} onGoToDetail={onGoToDetail} _detail={_detail} searchsale={searchsale} />)}
                    {_search && _search.map((search) => <Item key={search.id} _search={search} onGoToCart={onGoToCart} _mustlogged={_mustlogged} onGoToDetail={onGoToDetail} _detail={_detail} />)}
                </div>
            </section>
        </div>
    </>
}