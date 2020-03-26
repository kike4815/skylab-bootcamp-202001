import React, { useEffect, useState } from 'react'
import './Item.sass'
import Mustlogged from './Mustlogged'
import Detail from './Detail'


export default function ({ _sail, onGoToCart, _mustlogged, onGoToDetail, _detail }) {
    const [openModal, setOpenModal] = useState(false)


    function handleToCart(event) {
        event.preventDefault()


        onGoToCart(_sail._id.toString())
    }

    function handleToDetail(event) {
        event.preventDefault()


        onGoToDetail(_sail._id)
        setOpenModal(true)
    }
 

    const handleModal = () => setOpenModal(!openModal)

    if (_sail) {

        return <>
            <div className="container-item">
                <div className="container-item__image">
                    <img src="img/bh_aerolight_disc.jpg" alt="" />
                </div>

                <div className="container-item__info">
                    <img src={_sail.image} />
                    <h3>{_sail.title}</h3>
                    <p>{_sail.description}</p>
                    <div className="container-item__prices">

                        <p className="container-item__price">{_sail.price}</p>
                        <p className="container-item__discounted">{_sail.price} </p>
                    </div>

                    <div className="container-item__tocart"><a href="" onClick={handleToCart}>Add To Cart</a></div>
                    <div className="container-item__details"><button className="container-item__butonmore"onClick={handleToDetail} >DETALLES</button></div>
                    <div>
                        {_mustlogged && <Mustlogged message="detail component" close={handleModal} />}
                    </div>
                </div>
            </div>

            {openModal && <Detail message="detail component" close={handleModal}  _detail={_detail}/>}
        </>
    }

}
