import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Home from "./components/pages/Home";
import Setting from "./components/pages/Setting";
import Edit from "./components/pages/Edit";
import Graph from "./components/pages/Graph";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(Math.floor(Math.random() * 6));

  return (
    <Router basename={"/score"}>
      <NavBar color={theme}/>
      <Routes>
        <Route path="/" element={<Home color={theme}/>}></Route>
        <Route path="/setting" element={<Setting changeTheme={setTheme} color={theme} />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/graph" element={<Graph/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
