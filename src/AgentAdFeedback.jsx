import React, { useState } from 'react';

const AgentAdFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback) {
      setMessage('Please provide feedback.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/agent-ad-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localStorage.getItem('username') || 'agent', feedback })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Feedback submitted!');
      setFeedback('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h3>Advertisement Feedback</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Your feedback about the advertisements..." required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AgentAdFeedback;
