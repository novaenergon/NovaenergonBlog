import { Link, NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <header className="header">
            <div className="brand-row">
                <img src="https://avatars.githubusercontent.com/u/126437195?s=400&u=f0f2056d560d7acbfc1e7ac19960fbeb75f81909&v=4" alt="Logo" className="logo" />
                <div>
                    <h1 className="title"><span className="brand">Novaenergon</span>Blog</h1>
                    <p className="tagline">Blog about python, ai and machine learning.</p>
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