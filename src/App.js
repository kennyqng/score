import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./components/Add";
import "./App.css";

function App() {
  return (
    <Router basename={"/score"}>
      <Routes>
        <Route path="/" element={<Add />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
