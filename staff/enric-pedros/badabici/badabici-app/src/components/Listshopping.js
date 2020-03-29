import React, {useEffect} from 'react'
import Itemshopping from './Itemshopping'
import './Listshopping.sass'



export default function ({ user, onGoToBack, _shoppinglist }) {
console.log(_shoppinglist.chart)
useEffect(()=> {
//como hago el useEffect???? pierdo los datos cuando F5
},[])

    function handleGoToBack(event) {
        event.preventDefault()
        onGoToBack()
    }


    // let _shoppingChart = []


    // for (let key in _shoppinglist) {
    //     if (_shoppinglist[key] === _shoppinglist.chart) {
    //         _shoppingChart[key] = _shoppinglist[key]
    //     }
    // }

    


    debugger
    return <>


        {user && <div className="future-breadcramp">BIENVENIDO {user.name}</div>}
        <div className="mainContainer">
            <div className="containerlistHeader">
                <div className="containerlistHeader__container-title">
                    <div className="containerlistHeader__title">
                        <h3>Carrito de Compra</h3>
                    </div>
                </div>
                <a href='#' className='containerlistHeader__buyit'>Realizar Pedido</a>
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
                { _shoppinglist.chart.map((shop) => <Itemshopping key={shop.id} shop={shop} />)} 
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
                <div></div>
                <div className="containertotal__pricetotal">
                    <h3>TOTAL</h3>
                    <p>subtotal</p>
                    <p>impuestos</p>
                    <p>total general</p>
                </div>
            </div>
            <div className="containerbutton">
                <a href='#' className='containerlistHeader__buyit'>Realizar Pedido</a>
            </div>
        </div>
    </>
}