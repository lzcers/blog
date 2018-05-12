import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import Routes from '@/routes'

import 'normalize.css'
import '@/styles/base.scss'

export default class App extends React.Component {
    render() {
        return (
            <div className="wrap">
                <Nav />
                <div className="content">
                    <Routes />
                </div>
                <Footer />
            </div>
        )
    }
}