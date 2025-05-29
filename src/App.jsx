import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/cadastro";
import React, { useState } from 'react'; 


function App() {
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirecionamento */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
