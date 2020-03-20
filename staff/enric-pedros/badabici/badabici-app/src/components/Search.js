import React, { useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { Context } from './ContextProvider'


export default function ({onMount})  {
    useEffect(() => {
        onMount()
    }, [])

    
    return <>
        <h1>HELLO</h1>
    </>
}