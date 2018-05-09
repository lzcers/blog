import React from 'react'
import '@/styles/nav.scss'

export default class Nav extends React.PureComponent {
    render() {
        return (
            <nav className="nav">
                <div className="nav-header">
                    <h1 className="nav-sitename">ksana</h1>
                </div>
                <ul className="nav-menu">
                    <li className="nav-item"><a>HOME</a></li>
                    <li className="nav-item"><a>ARCHIVER</a></li>
                    <li className="nav-item"><a>ABOUT</a></li>
                </ul>
            </nav>
        )
    }
}