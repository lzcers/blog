import React from 'react'
import { Link } from 'react-router-dom'
import './nav.less'

const Nav = () => (
    <nav className="nav">
        <div className="nav-header">
            <h1 className="nav-sitename">
                <Link to="/home">
                    <div className="nav-title">
                        刹
                        <div className="taijiBox">
                            <div className="taiji" />
                        </div>
                        那
                    </div>
                </Link>
            </h1>
        </div>
        <ul className="nav-menu">
            {/* <li className="nav-item">
                <Link to="/aranya">ARANYA</Link>
            </li> */}
        </ul>
    </nav>
)

export default Nav
