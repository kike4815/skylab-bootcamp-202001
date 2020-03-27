import React from 'react'

const Home = ({user: {name, surname, email}}) => {
    return <section>
        <h1>BIENVENIDO</h1>
        <p>{name}</p>
        <p>{surname}</p>
        <p>{email}</p>
        </section>
}

export default Home