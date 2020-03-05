import React, { useState, useEffect } from 'react'
import { Register, Login, Home } from './'
import { registerUser, authenticate, lastEvents } from '../logic'

function App() {
  const [view, setView] = useState('register')
  const handleRegister = async (name, surname, email, password) => {
    try {
      await registerUser(name, surname, email, password)
      setView('login')
    } catch (error) {
      const { message } = error
      console.log(message)
    }
  }
  const handleLogin = async (email, password) => {
    try {
      const token = await authenticate(email, password)
      sessionStorage.token = token
      setView('home')
    } catch (error) {
      //feedback
      console.log(error)
    }

  }


  handleGoToRegister = () => {
    setView('register')
  }
  // const handleLastEvents = () => {
  //   lastEvents()
  //     .then(events => {
  //       console.log(events)
  //     })
  // }
  return <div className="App">
    {view === 'register' && <Register onSubmit={handleRegister} setView={setView} />}
    {view === 'login' && <Login onLogin={handleLogin} goToRegister={handleGoToRegister} />}
    {view === 'home' && <Home />}
  </div>
}
export default App