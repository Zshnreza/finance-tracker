import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });

      console.log("✅ Login response:", res.data); // 🔍 Check token structure

      // ⚠️ Defensive check
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert("Login successful!");
        navigate('/transactions');
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
