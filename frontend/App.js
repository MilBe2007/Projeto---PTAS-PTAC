import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import AtualizarPerfil from './pages/AtualizarPerfil';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/cadastro">Cadastro</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/atualizar-perfil">Atualizar Perfil</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/atualizar-perfil" element={<AtualizarPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;
