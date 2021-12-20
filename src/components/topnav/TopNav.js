import React from 'react';
import {
    NavLink
} from "react-router-dom";
import "./TopNav.css"

function TopNav({subredditView, children}) {

    return (
        <nav>
            <div className="nav-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subpage" activeClassName="active-link">Postpagina</NavLink>
                    </li>
                    {children}
                    <li><strong>☰</strong></li>
                </ul>
            </div>
        </nav>
    );
}

export default TopNav;
