import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAddAgent = () => {
  const [form, setForm] = useState({ name: '', surname: '', id: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    if (form.password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/admin/add-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Agent registered successfully! A verification email has been sent.');
      setForm({ name: '', surname: '', id: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register New Agent</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={styles.input}
        />
        <input
          name="surname"
          value={form.surname}
          onChange={handleChange}
          placeholder="Surname"
          required
          style={styles.input}
        />
        <input
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID"
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Set Password (min 8 chars)"
          required
          minLength={8}
          style={styles.input}
        />
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          minLength={8}
          style={styles.input}
        />
        <button type="submit" style={styles.submitBtn}>Register Agent</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <button onClick={() => navigate('/admin-dashboard')} style={styles.backBtn}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 480,
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    color: '#4f8cff',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: 8,
    border: '1px solid #ccc',
    outlineColor: '#4f8cff',
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#4f8cff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  backBtn: {
    marginTop: 24,
    padding: '10px 20px',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
};

export default AdminAddAgent;
