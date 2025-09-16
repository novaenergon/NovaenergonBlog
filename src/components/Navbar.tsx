import { Link, NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <header className="header">
            <div className="brand-row">
                <img src="https://avatars.githubusercontent.com/u/228281554?s=400&u=c55b4b7edd83b45e689be120077ceab8735faf79&v=4" alt="Logo" className="logo" />
                <div>
                    <h1 className="title"><span className="brand">ravizenx</span>Blog</h1>
                    <p className="tagline">Personal blog about python, ai and machine learning.</p>
                </div>
            </div>


            <nav className="nav-wrap">
                <ul className="nav">
                    <li><NavLink to="/" end>All</NavLink></li>
                    <li><NavLink to="/category/Python">Python</NavLink></li>
                    <li><NavLink to="/category/AI">AI</NavLink></li>
                    <li><NavLink to="/category/MachineLearning">Machine Learning</NavLink></li>
                    <li><NavLink to="/category/DataModeling">Data Modeling</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
                <Link to="/" className="nav-cta">Download</Link>
            </nav>
        </header>
    );
}