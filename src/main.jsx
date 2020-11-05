import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import Routes from '@/routes'
import 'normalize.css'
import '@/styles/base.less'

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById('app')
)
