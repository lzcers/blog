import { Link } from 'react-router-dom';
import './nav.less';

const Nav = () => (
    <nav className="nav">
        <div className="nav-header">
            <h1 className="nav-sitename">
                <Link to="/blog">
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
            <li className="nav-item">
                <Link to="/">LIFEGAME</Link>
            </li>
            <li className="nav-item">
                <Link to="/blog">BLOG</Link>
            </li>
            <li className="nav-item">
                <Link to="/blog/aranya">ARANYA</Link>
            </li>
            <li className="nav-item">
                <Link to="/blog/aboutme">ABOUT</Link>
            </li>
        </ul>
    </nav>
)

export default Nav
