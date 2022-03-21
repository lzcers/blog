import { Routes, Route } from 'react-router-dom';
import Post from '@/pages/Post';
import Archive from '@/pages/Archive';
import About from '@/pages/About';
import Aranya from '@/pages/Aranya';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const BlogRoutes = () => (
    <Routes>
        <Route path="/" element={<Archive />} />
        <Route path="/tag/:tag" element={<Archive />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/aboutme" element={<About />} />
        <Route path="/aranya" element={<Aranya />} />
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
        <Route path="/" element={<Blog />} />
        <Route path="/blog/*" element={<Blog />} />
    </Routes>
);

export default MainRoutes;
