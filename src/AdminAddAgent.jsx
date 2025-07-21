import React, { useState } from 'react';

const AdminAddAgent = () => {
  const [form, setForm] = useState({ name: '', surname: '', id: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:4000/api/admin/add-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Agent registered successfully!');
      setForm({ name: '', surname: '', id: '', email: '', password: '' });
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
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Set Password" required />
        <button type="submit">Register Agent</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminAddAgent;
