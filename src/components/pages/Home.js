import { useEffect, useState } from "react";
import Add from "../Add/Add";
import "./Home.css";

function Home (props) {
    return (
        <div>
            <Add color={props.color} ></Add>
        </div>
    );
}

export default Home;