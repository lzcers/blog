import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import Routes from '@/routes'
import 'normalize.css'
import '@/styles/base.scss'
import { getPosts } from '@/api'

setTimeout(() => getPosts(), 1)

const App = _ => <Routes />

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
)
