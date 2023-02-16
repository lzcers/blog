import { Routes, Route } from "react-router-dom";
import Post from "@/pages/Post";
import Archive from "@/pages/Archive";
import About from "@/pages/About";
import Aranya from "@/pages/Aranya";
import See from "@/pages/See";
import Resume from "@/pages/Resume";
import Stream from "@/pages/Stream";
import Door from "@/pages/Door";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useContext } from "react";
import { globalState } from "@/main";

const BlogRoutes = () => (
    <Routes>
        <Route path="/" element={<Archive />} />
        <Route path="/tag/:tag" element={<Archive />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/aboutme" element={<About />} />
        <Route path="/aranya" element={<Aranya />} />
        <Route path="/see" element={<See />} />
        <Route path="/door" element={<Door />} />
    </Routes>
);

const Blog = () => {
    const { darkMode } = useContext(globalState)!;
    return (
        <div className="container" data-theme={darkMode ? "dark-mode" : "light-mode"}>
            <div className="main">
                <Nav />
                <div className="content">
                    <BlogRoutes />
                </div>
                <Footer />
            </div>
        </div>
    );
};

const MainRoutes = () => (
    <Routes>
        <Route path="/*" element={<Blog />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/stream" element={<Stream />} />
    </Routes>
);

export default MainRoutes;
