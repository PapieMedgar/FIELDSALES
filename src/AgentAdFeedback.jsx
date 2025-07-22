import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentAdFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage('Please provide feedback.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/agent-ad-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localStorage.getItem('username') || 'agent', feedback }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Feedback submitted!');
      setFeedback('');
      setSubmitted(true);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Advertisement Feedback</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder="Your feedback about the advertisements..."
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.submitBtn}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {submitted && (
        <button style={styles.backBtn} onClick={() => navigate('/agent-dashboard')}>
          Back to Dashboard
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1f2937',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.25rem',
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    color: '#4f8cff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textarea: {
    minHeight: 120,
    padding: '12px',
    fontSize: '1rem',
    borderRadius: 8,
    border: '1px solid #ccc',
    resize: 'vertical',
    outlineColor: '#4f8cff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#4f8cff',
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(79, 140, 255, 0.5)',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    color: 'green',
  },
  backBtn: {
    marginTop: 12,
    padding: '10px 20px',
    backgroundColor: '#7aa9ff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 4px 10px rgba(122, 169, 255, 0.5)',
  },
};

export default AgentAdFeedback;
