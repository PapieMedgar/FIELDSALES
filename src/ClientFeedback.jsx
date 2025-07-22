import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [fica, setFica] = useState(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

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
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Feedback and FICA uploaded!');
      setFeedback('');
      setFica(null);
      setSubmitted(true);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>SIM Card Feedback & FICA Upload</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback about the SIM card..."
          required
          style={styles.textarea}
          rows={5}
        />
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFicaChange}
          required
          style={styles.fileInput}
        />
        <button type="submit" style={styles.submitBtn}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {submitted && (
        <button
          style={styles.backBtn}
          onClick={() => navigate('/client-dashboard')}
        >
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
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '90%', // responsive width on small screens
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    color: '#2563eb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  textarea: {
    padding: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: 100,
    outlineColor: '#4f8cff',
    width: '100%',
    boxSizing: 'border-box',
  },
  fileInput: {
    borderRadius: 8,
    border: '1px solid #ccc',
    padding: '6px 12px',
    fontSize: '1rem',
  },
  submitBtn: {
    backgroundColor: '#4f8cff',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: 8,
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: '500',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#7aa9ff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 8,
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
  },
};

export default ClientFeedback;
