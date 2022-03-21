import { useEffect, useState } from "react";
import Add from "../Add/Add";
import "./Home.css";

function Home () {
    return (
        <div>
            <div className="title"><p className="title-text">Score</p></div>
            <Add></Add>
        </div>
    );
}

export default Home;