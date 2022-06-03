import React from 'react'
import logo from '../Logo.png'
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src={logo} width="180" height="28"/>
                </Link>
            </div>
        </nav>
    )
}