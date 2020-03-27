import React, {useState} from 'react'
import './Listshopping.sass'
import Mustlogged from './Mustlogged'



export default function ({user, _mustlogged}) {
    const [modalLogin, setModalLogin] = useState(false)
 


        if (_mustlogged){
            setModalLogin(false)
        } else {
            setModalLogin(true)
        }
    

    const handleModalLogin = () => setModalLogin(!modalLogin)

    debugger
    return <>

        {modalLogin && <Mustlogged message="detail component" close={handleModalLogin} />} 

        {user && <div className="future-breadcramp">BIENVENIDO {user.name}</div>}
        <div className="mainContainer">
            <div className="containerlistHeader">
                <div className="containerlistHeader__container-title">
                    <div className="containerlistHeader__title">
                        <h3>Carrito de Compra</h3>
                    </div>
                </div>
                <button className='containerlistHeader__buyit'>Realizar Pedido</button>
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
                <button className="containerfollow__buttonfollow">seguir comprando</button>
                <button className="containerfollow__buttonempty">vaciar lista</button>
            </div>
            <div className="containertotal">
                <div className="containertotal__discounts">
                    <h3>CÓDIGOS DE DESCUENTO</h3>
                    <p>ingrese su código de cupón si tiene</p>
                    <input type="text" className="containertotal__input" />
                    <button className="containertotal__button">aplicar descuento</button>
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
                <button className='containerlistHeader__buyit'>Realizar Pedido</button>
            </div>
        </div>
    </>
}