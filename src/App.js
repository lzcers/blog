import React from 'react'
import Nav from '@/components/Nav.js'

import Router from '@/router'

import 'normalize.css'
import '@/styles/base.scss'

export default class App extends React.Component {
    render() {
        return (
            <div className="wrap">
                <Nav />
                <Router />
            </div>
        )
    }
}