import React, { useState } from 'react';

const ClientFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [fica, setFica] = useState(null);
  const [message, setMessage] = useState('');

  const handleFicaChange = (e) => {
    setFica(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback || !fica) {
      setMessage('Please provide feedback and upload FICA document.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('username', localStorage.getItem('username') || 'client');
      formData.append('feedback', feedback);
      formData.append('fica', fica);
      const res = await fetch('http://localhost:4000/api/client-feedback', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Feedback and FICA uploaded!');
      setFeedback('');
      setFica(null);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h3>SIM Card Feedback & FICA Upload</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Your feedback about the SIM card..." required />
        <input type="file" accept="application/pdf,image/*" onChange={handleFicaChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ClientFeedback;
