import blogServer from '@/api/server';
import { globalState } from '@/main';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.less';
import './taiji.less';

const Nav = () => {
    const navigate = useNavigate();
    const { isEditor, setIsEditor } = useContext(globalState)!;

    const knockDoor = () => {
        blogServer.authToken().then(({ result }) => {
            if (result) {
                localStorage.setItem("token", '');
                setIsEditor(false);
            } else {
                navigate("/door");
            }
        })
    }

    return (
        <nav className="nav">
            <div className="nav-header">
                <h1 className="nav-sitename">
                    <div className="nav-title">
                        <Link to="/">刹</Link>
                        <div className="taijiBox" onClick={knockDoor}>
                            <div className={`taiji ${isEditor ? 'harmony' : 'turn'}`} />
                        </div>
                        <Link to="/">那</Link>
                    </div>
                </h1>
            </div>
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/">博客</Link>
                </li>
                <li className="nav-item">
                    <Link to="/aranya">兰若</Link>
                </li>
                <li className="nav-item">
                    <Link to="/see">见闻</Link>
                </li>
                <li className="nav-item">
                    <Link to="/aboutme">我</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav
