import { Routes, Route } from 'react-router-dom';
import Post from '@/pages/Post';
import Archive from '@/pages/Archive';
import About from '@/pages/About';
import Aranya from '@/pages/Aranya';
import See from '@/pages/See';
import Door from '@/pages/Door';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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

const Blog = () => (
    <div className="container">
        <Nav />
        <div className="content">
            <BlogRoutes />
        </div>
        <Footer />
    </div>
);


const MainRoutes = () => (
    <Routes>
        <Route path="/*" element={<Blog />} />
    </Routes>
);

export default MainRoutes;
