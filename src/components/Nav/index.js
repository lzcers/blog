import React from 'react'
import { Link } from 'react-router-dom'

import './nav.scss'

export default class Nav extends React.PureComponent {
    render() {
        return (
            <nav className="nav">
                <div className="nav-header">
                    <h1 className="nav-sitename">ksana</h1>
                </div>
                <ul className="nav-menu">
                    <li className="nav-item"><Link to="/home">HOME</Link></li>
                    <li className="nav-item"><Link to="/archiver">ARCHIVER</Link></li>
                    <li className="nav-item"><Link to="/about">ABOUT</Link></li>
                </ul>
            </nav>
        )
    }
}