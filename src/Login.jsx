import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Fixed import path assuming Login.jsx is inside src/

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
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('username', data.user.username);
      localStorage.setItem('role', data.user.role);
      data.user.name
        ? localStorage.setItem('name', data.user.name)
        : localStorage.removeItem('name');
      data.user.surname
        ? localStorage.setItem('surname', data.user.surname)
        : localStorage.removeItem('surname');

      if (data.user.role === 'admin') navigate('/admin-dashboard');
      else if (data.user.role === 'client') navigate('/client-dashboard');
      else if (data.user.role === 'agent') navigate('/agent-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '1rem',
    background: '#f5f7fb',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    color: '#4f8cff',
    marginBottom: '1rem',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    outlineColor: '#4f8cff',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4f8cff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
};

export default Login;
