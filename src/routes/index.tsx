import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Post from "@/pages/Post";
import Archive from "@/pages/Archive";
import About from "@/pages/About";
// import Akashic from "@/pages/Akashic";
// import Aranya from "@/pages/Aranya";
// import Resume from "@/pages/Resume";
import Door from "@/pages/Door";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { globalState } from "@/main";

const BlogRoutes = () => (
    <Routes>
        <Route path="/" element={<Archive />} />
        {/* 为了匹配`计算机/编程`这样的多级标签,需要用*来匹配 */}
        <Route path="/tag/*" element={<Archive />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/aboutme" element={<About />} />
        <Route path="/aranya" element={<Door />} />
        {/* <Route path="/akashic" element={<Akashic />} /> */}
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
        {/* <Route path="/resume" element={<Resume />} /> */}
    </Routes>
);

export default MainRoutes;
