import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
// import './App.css'
import './App.sass'
import { sayHello } from '../logic'

function App({ name }) {
  const [count, setCount] = useState(0)
  const [view, setView] = useState('home')
  const [hello, setHello] = useState()

  function countUp(event) {
    event.preventDefault()

    setCount(count + 1)
    count > 4 && setView('message')
  }

  useEffect(() => { sayHello(name).then(setHello) }, [])

  return <div className="App">
    <h1>{hello}</h1>
    <form onSubmit={countUp}>
      <span>{count}</span>
      {view === 'message' && <h2>count {count} reached!</h2>}
      <button>++</button>
    </form>
  </div>
}

export default App
