import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { getTags, getPosts } from '@/api'
import App from './App'

setTimeout(() => getTags(), 1)
setTimeout(() => getPosts(), 1)

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
)
