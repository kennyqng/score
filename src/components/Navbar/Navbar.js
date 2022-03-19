import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function NavBar() {

    return (
        <div className="Navbar">
            <ul>
                <li><Link to="/" className="home" >Home</Link></li>
                <li ><Link to="/setting" className="link-setting" >Setting</Link></li>
            </ul>
        </div>
    )
}

export default NavBar;