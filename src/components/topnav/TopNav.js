import React from 'react';
import {
    NavLink
} from "react-router-dom";
import "./TopNav.css"

function TopNav() {
    return (
        <nav>
            <div className="nav-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subpage" activeClassName="active-link">Subpagina</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default TopNav;