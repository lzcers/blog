import React from 'react'
import Nav from '@/components/nav.jsx'
import Article from '@/components/article.jsx'

import 'normalize.css'
import '@/styles/base.scss'

export default class App extends React.Component {
    render() {
        return (
            <div className="wrap">
                <Nav />
                <Article />
            </div>
        )
    }
}