import React from 'react'
import './Listshopping.sass'




export default function ({user, onGoToBack}) {

function handleGoToBack (event){
    event.preventDefault()

    onGoToBack()
}
        
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
                <div className="containerbody__item">
                    <div className="containerbody__image">

                    </div>
                    <div className="containerbody__description">

                    </div>
                </div>
                <div className="containerbody__price">

                </div>
                <div className="containerbody__trash">
                    <i className="fa fa-trash fa-3x"></i>
                </div>
            </div>
            <div className="containerfollow">
                <a a href='#' className="containerfollow__buttonfollow" onClick={handleGoToBack}>seguir comprando</a>
                <a a href='#' className="containerfollow__buttonempty">vaciar lista</a>
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