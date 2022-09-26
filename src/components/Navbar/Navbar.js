import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Button, Slider, Box, Grid, Icon } from "@mui/material/";
import "./Navbar.css";

function NavBar(props) {
    const colorPreset = ['#0f6896','#4B1980','#df5a4e','#4ea0ff','#22c1c3'];
    return (
        <div className="Navbar">
            <ul>
                <li><Link to="/" className="link-home" style={{color: colorPreset[props.color]}}> <Icon>home</Icon> </Link></li>
                <li ><Link to="/setting" className="link-setting" style={{color: colorPreset[props.color]}} > <Icon>settings</Icon> </Link></li>
            </ul>
        </div>
    )
}

export default NavBar;