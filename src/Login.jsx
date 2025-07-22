import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // Store username, role, name, and surname in localStorage
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('role', data.user.role);
      if (data.user.name) localStorage.setItem('name', data.user.name);
      else localStorage.removeItem('name');
      if (data.user.surname) localStorage.setItem('surname', data.user.surname);
      else localStorage.removeItem('surname');
      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.user.role === 'client') {
        navigate('/client-dashboard');
      } else if (data.user.role === 'agent') {
        navigate('/agent-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
};

export default Login;
