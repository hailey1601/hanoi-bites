import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import Signup from "./pages/Singup/signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Không tìm thấy trang</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;