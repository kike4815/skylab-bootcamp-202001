import React, { useEffect } from 'react'
import './Navigation.sass'

export default function ({onGoToContact, onGoToSearch, onGoToSails, onGoToUpdate}) {
    
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
    
    
    return <> 
    <div className="leftIcon">
        <ul>
            <li className="leftIcon__home"><a href="" onClick = {handleGoToSearch}><i className="fa fa-home"></i></a>
            </li>
            <li className="leftIcon__users"><a href="" onClick = {handleGoToUpdate}><i className="fa fa-users"></i></a>
            </li>
            <li className="leftIcon__shopping"><a href=""><i className="fa fa-shopping-cart"></i></a>
            </li>
            <li className="leftIcon__discount"><a href="" onClick = {handleGoToSails}><i className="fa fa-percent"></i></a>
            </li>
            <li className="leftIcon__contact"><a href="" onClick = {handleGoToContact}><i className="fa fa-envelope"></i></a>
            </li>
        </ul>
     </div>

    <div className="righticon">
        <div className="righticonin">
        <a href="javascript:void('0')" className="miniCartbtn"><i className="fa fa-archive"></i></a>
        </div>
    </div>
    </>
}