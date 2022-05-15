import blogServer from "@/api/server";
import { globalState } from "@/main";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.less";
import "./taiji.less";

const Nav = () => {
    const navigate = useNavigate();
    const { isEditor, setIsEditor, darkMode, setDarkMode } = useContext(globalState)!;

    const knockDoor = () => {
        blogServer.authToken().then(({ result }) => {
            if (result) {
                localStorage.setItem("token", "");
                setIsEditor(false);
            } else {
                navigate("/door");
            }
        });
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
                <li className="nav-item" onClick={() => navigate("/")}>
                    博客
                </li>
                <li className="nav-item" onClick={() => navigate("/see")}>
                    见闻
                </li>
                <li className="nav-item" onClick={() => navigate("/aranya")}>
                    兰若
                </li>
                <li className="nav-item" onClick={() => navigate("/aboutme")}>
                    我
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
