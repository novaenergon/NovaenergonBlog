import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CategoryFeed from "./pages/CategoryFeed";

export default function App() {
    return (
        <div className="app">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:slug" element={<PostPage />} />
                <Route path="/category/:name" element={<CategoryFeed />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <footer className="footer">© {new Date().getFullYear()} ravizenx-blog · All rights reserved.</footer>
        </div>
    );
}