import React, { useState } from 'react'

const Context = React.createContext([{}, () => { }])

function Provider({ children }) {
    const [state, setState] = useState({})
    function setState_(){
        console.log(new Error)
        setState.apply(undefined,arguments)
    }
    return (
        <Context.Provider value={[state, setState_]}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }