import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/book">Book a request</Link>
                </li>
            </ul>
        </nav>
    );
}
function Header() {
    return (
        <div className="App-header">SeTMaS - Seminar and Talks Management System</div>
    );
}


const Layout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;