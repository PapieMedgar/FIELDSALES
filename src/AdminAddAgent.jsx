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
        body: JSON.stringify(form)
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
    <div className="container">
      <h2>Register New Agent</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" required />
        <input name="id" value={form.id} onChange={handleChange} placeholder="ID" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Set Password (min 8 chars)" required minLength={8} />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required minLength={8} />
        <button type="submit">Register Agent</button>
      </form>
      {message && <p>{message}</p>}
      <button style={{marginTop:24}} onClick={() => navigate('/admin-dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminAddAgent;
