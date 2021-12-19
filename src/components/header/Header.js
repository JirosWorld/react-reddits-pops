import React from 'react';
import logo from "../../logo.svg";
import TopNav from "../topnav/TopNav";
import "./Header.css"

function Header({title}) {
    return (
        <>
            <TopNav/>
            <header>
                <div className="title-container">
                    <img src={logo} className="App-logo" alt={title}/>
                    <h1>{title}</h1>
                </div>
            </header>
        </>
    );
}

export default Header;