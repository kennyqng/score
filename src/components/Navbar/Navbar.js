import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Button, Slider, Box, Grid, Icon } from "@mui/material/";
import "./Navbar.css";

function NavBar() {

    return (
        <div className="Navbar">
            <ul>
                <li><Link to="/" className="link-home" > <Icon>home</Icon> </Link></li>
                <li ><Link to="/setting" className="link-setting" > <Icon>settings</Icon> </Link></li>
            </ul>
        </div>
    )
}

export default NavBar;