import React from 'react'
import { Link } from 'react-router-dom'
import './nav.scss'

const Nav = () => (
    <nav className="nav">
        <div className="nav-header">
            <h1 className="nav-sitename">刹那</h1>
        </div>
        <ul className="nav-menu">
            <li className="nav-item">
                <Link to="/home">HOME</Link>
            </li>
            <li className="nav-item">
                <Link to="/archive">ARCHIVE</Link>
            </li>
            {/* <li className="nav-item">
                <Link to="/aranya">ARANYA</Link>
            </li> */}
            <li className="nav-item">
                <Link to="/about">ABOUT</Link>
            </li>
        </ul>
    </nav>
)

export default Nav
