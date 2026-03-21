import { globalState } from "@/main";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.less";
import "./taiji.less";

const Nav = () => {
    const navigate = useNavigate();
    const { isEditor, darkMode, setDarkMode } = useContext(globalState)!;

    const knockDoor = () => {
        navigate("/door");
    };

    return (
        <nav className="nav">
            <div className="nav-header">
                <h1 className="nav-sitename">
                    <Link to="/">刹</Link>
                    <div className="taijiBox" onClick={knockDoor}>
                        <div className={`taiji ${isEditor ? "harmony" : "turn"}`} />
                    </div>
                    <Link to="/">那</Link>
                </h1>
            </div>
            <ul className="nav-menu">
                <button className="dark-mode-btn" onClick={() => setDarkMode(~darkMode)}>
                    🌓
                </button>
                {/* <li className="nav-item" onClick={() => navigate("/")}>
                    博客
                </li> */}
                {/* <li className="nav-item" onClick={() => navigate("/aranya")}>
                    兰若
                </li> */}
                {/* <li className="nav-item" onClick={() => navigate("/akashic")}>
                    见闻
                </li> */}
                <li className="nav-item" onClick={() => navigate("/photo")}>
                    相册
                </li>
                <li className="nav-item" onClick={() => navigate("/aboutme")}>
                    关于
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
