import { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import Routes from "@/routes";
import "normalize.css";
import "./base.less";

const container = document.getElementById("app")!;
const root = createRoot(container);

type GlobalState = { isEditor: boolean; setIsEditor: Function; darkMode: boolean; setDarkMode: Function };
export const globalState = createContext<GlobalState | null>(null);

const RootContainer = () => {
    const [isEditor, setIsEditor] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    return (
        <Router>
            <globalState.Provider value={{ isEditor, setIsEditor, darkMode, setDarkMode }}>
                <Routes />
            </globalState.Provider>
        </Router>
    );
};

root.render(<RootContainer />);
