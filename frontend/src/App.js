import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import './styles/theme.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <div style={{ padding: '10px' }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
