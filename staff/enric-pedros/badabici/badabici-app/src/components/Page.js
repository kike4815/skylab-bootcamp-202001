import React from 'react'
import './Page.sass'

export default function ({ name, children }) {
    return <section className={`page page--${name}`}>
        <div className="page__container">
            {children}
        </div>
    </section>
}