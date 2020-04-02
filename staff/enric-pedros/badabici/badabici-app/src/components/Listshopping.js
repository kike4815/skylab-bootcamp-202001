import React, { useEffect, useState, useContext } from 'react'
import Itemshopping from './Itemshopping'
import './Listshopping.sass'
import { isLoggedIn, retrieveUser, shoppinglist } from '../logic'
import { Context } from './ContextProvider'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function ({ onGoToBack, goToOrdered, onGoToCart }) {

    const [spinner, setSpinner] = useState(false)
    const [state, setState] = useContext(Context)
    const [_shoppinglist, setShoppinglist] = useState()
    const [_user, setUser] = useState()
    const [total, setTotal] = useState()

    let prices = []
    
    let totaldiscounted =( total + (total * (21 / 100))).toFixed(2)
debugger
    useEffect(() => {
        if (isLoggedIn()) {

            (async () => {
                try {

                    const __user = await retrieveUser()

                    setUser(__user)
                    const shoppingList = await shoppinglist()
                    setShoppinglist(shoppingList)
                    
                    shoppingList.chart.forEach(item => {
                        prices.push(Number(item.price)) 
                            
                    })

                    setTotal(prices.reduce(function (acc, val) { return acc + val; }, 0))

                } catch ({ message }) {
                    setState({ ...state, error: message })
                    setTimeout(() => setState({ ...state, error: undefined }), 3000)
                }
            })()
        }
        else {
            onGoToBack()
        }
    }, [])

    function handleGoToBack(event) {
        event.preventDefault()
        onGoToBack()
    }



    function handlegoToOrdered(e) {
        e.preventDefault()
     
            setSpinner(true)

        
        goToOrdered()
    }

    debugger

    return <>


        {_user && <div className="future-breadcramp"><i className="fa fa-bicycle"></i>Bienvenido {_user.name}<i className="fa fa-bicycle"></i></div>}
        <div className="mainContainer">
            <div className="containerlistHeader">
                <div className="containerlistHeader__container-title">
                    <div className="containerlistHeader__title">
                        <h3>Carrito de Compra</h3>
                    </div>
                </div>
                <a href='#' className='containerlistHeader__buyit' onClick={handlegoToOrdered}>Realizar Pedido</a>
            </div>
            <div className="containertypes">
                <div className="container__name">
                    <p>Nombre del producto</p>
                </div>
                <div className="container__price">
                    <p>Precio Unitario</p>

                </div>
            </div>
            <div className="containerbody">
                {_shoppinglist && _shoppinglist.chart.map((shop) => <Itemshopping key={shop.id} shop={shop} onGoToCart={onGoToCart} />)}
            </div>

            <div className="containerfollow">
                <a href='#' className="containerfollow__buttonfollow" onClick={handleGoToBack}>seguir comprando</a>
                <a href='#' className="containerfollow__buttonempty">vaciar lista</a>
            </div>
            <div className="containertotal">
                <div className="containertotal__discounts">
                    <h3>CÓDIGOS DE DESCUENTO</h3>
                    <p>ingrese su código de cupón si tiene</p>
                    <input type="text" className="containertotal__input" />
                    <a href='#' className="containertotal__button">aplicar descuento</a>
                </div>
                <div>

                </div>
                <div className="containertotal__pricetotal">
                    <h3>TOTAL </h3>
                    <div className='containertotal__subtotal'>
                        <p>subtotal </p>
                        {total && <span>{total} €</span>}
                        <p>impuestos</p>
                        <span>21%</span>
                        <p>total general</p>
                        <span> {totaldiscounted} €</span>
                    </div>
                </div>
            </div>
            <div className="containerbutton">
                {spinner && <Loader type="Watch"color="#00BFFF" height={50} width={100} timeout={3000} />}
                <a href='#' className='containerlistHeader__buyit' onClick={handlegoToOrdered}>Realizar Pedido</a>
            </div>
           
        </div>
    </>
}