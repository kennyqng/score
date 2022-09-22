import { useEffect, useState } from "react";
import Add from "../Add/Add";
import "./Home.css";

function Home (props) {
    return (
        <div>
            {/* <div className="title"><p className="title-text">Score</p></div> */}
            <Add color={props.color} ></Add>
        </div>
    );
}

export default Home;