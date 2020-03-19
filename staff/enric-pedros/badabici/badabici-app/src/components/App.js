import React, { useEffect, useContext } from 'react'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { registerUser, login, isLoggedIn } from '../logic' 
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)

  useEffect(() => {
    if (isLoggedIn()) {

      history.push('/home')
    } else {

      history.push('/login')
    }
  }, [])

  async function handleRegister(name, surname, email, password) {
    try {
      await registerUser(name, surname, email, password)

      setState({ page: 'login' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)

      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  function handleGoToLogin() {
    history.push('/login')
  }

  function handleGoToRegister() {
    history.push('/register')
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  const { page, error } = state

  return <div className="app">
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
      {/* <Route path="/" render={() => <h1>Hello, All</h1>} /> */}
      {/* <Route path="/login" render={() => <h1>Hello, Login</h1>} /> */}
      <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />
    </Page>
  </div>
}) 