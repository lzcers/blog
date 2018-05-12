import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import Router from '@/router'

import 'normalize.css'
import '@/styles/base.scss'

export default class App extends React.Component {
    render() {
        return (
            <div className="wrap">
                <Nav />
                <div className="content">
                    <Router />
                </div>
                <Footer />
            </div>
        )
    }
}