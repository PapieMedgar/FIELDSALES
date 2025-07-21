import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => (
  <div className="container">
    <h1 style={{ color: '#4f8cff', fontWeight: 700, letterSpacing: 1 }}>Field Sales</h1>
    <h2 style={{ color: '#222', fontWeight: 400, marginTop: 0 }}>by GoNxt</h2>
    <p style={{ fontSize: '1.2em', margin: '1.5em 0' }}>
      Welcome to Field Sales, your modern platform for tracking field agent activity, store visits, and more.
    </p>
    <div>
      <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  </div>
);

export default LandingPage;
