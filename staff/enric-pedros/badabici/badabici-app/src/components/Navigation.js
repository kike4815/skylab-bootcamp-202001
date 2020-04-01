import React, { useState, useEffect, useContext } from 'react'
import './Navigation.sass'
import Confirmout from './Confirmout'
import { Context } from './ContextProvider'
import { isLoggedIn, shoppinglist,retrieveUser } from '../logic'


export default function ({ onGoToContact, onGoToSearch, onGoToSails, onGoToUpdate, onGoToLogout, onGoToShopping, user }) {
    const [state, setState] = useContext(Context)
    const [openModal, setOpenModal] = useState(false)
    const [addshopped, setAddshopped] = useState([])
    const [_user, setUser] = useState()



    useEffect(() => {
        let interval = setInterval(() => {
            if (isLoggedIn()) {

                (async () => {
                    try {
                        const _user = await retrieveUser() 
                        setUser(_user)
                        const shop = await shoppinglist()
                        setAddshopped(shop.chart)
                        clearInterval(interval)

                    } catch ({ message }) {
                        setState({ ...state, error: message })
                        setTimeout(() => setState({ ...state, error: undefined }), 3000)
                    }
                })()
            }else setUser(undefined)
        }, 100)
    }, [])


    function handleGoToContact(event) {
        event.preventDefault()

        onGoToContact()
    }
    function handleGoToSearch(event) {
        event.preventDefault()

        onGoToSearch()
    }
    function handleGoToSails(event) {
        event.preventDefault()

        onGoToSails()
    }
    function handleGoToUpdate(event) {
        event.preventDefault()

        onGoToUpdate()
    }


    function handleGoToShopping(event) {
        event.preventDefault()

        onGoToShopping()
    }




    const handleModalLogout = (event) => {
        event.preventDefault()
        setOpenModal(!openModal)
    }

    return <>
        <div className="leftIcon">
            <ul>
                <li className="leftIcon__home"><a href="" onClick={handleGoToSearch}><i className="fa fa-home"></i></a>
                </li>
                <li className="leftIcon__users"><a href="" onClick={handleGoToUpdate}><i className="fa fa-users"></i></a>
                </li>
                <li className="leftIcon__shopping"><a href="" onClick={handleGoToShopping}>{addshopped.length ? <i id='red' className="fa fa-shopping-cart"></i> : <i className="fa fa-shopping-cart"></i>}</a>
                </li>
                <li className="leftIcon__discount"><a href="" onClick={handleGoToSails}><i className="fa fa-percent"></i></a>
                </li>
                <li className="leftIcon__contact"><a href="" onClick={handleGoToContact}><i className="fa fa-envelope"></i></a>
                </li>
            </ul>
        </div>

        <div className="righticon">
            <div className="righticonin">
                {_user && <a href="#" className="miniCartbtn" onClick={handleModalLogout}><i className="fas fa-power-off"></i></a>}
            </div>
        </div>
        {openModal && <Confirmout message="detail component" close={handleModalLogout} onGoToLogout={onGoToLogout} />}
    </>
}

