import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
