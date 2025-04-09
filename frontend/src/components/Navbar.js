import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> | 
      <Link to="/transactions">Transactions</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/register">Register</Link>
    </nav>
  );
}
