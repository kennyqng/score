import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Home from "./components/pages/Home";
import Setting from "./components/pages/Setting";
import Edit from "./components/pages/Edit";
import "./App.css";

function App() {
  return (
    <Router basename={"/score"}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
