import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
      <Route path="/Home" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
