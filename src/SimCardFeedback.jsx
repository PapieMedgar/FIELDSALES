import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimCardFeedback = () => {
  const [agents, setAgents] = useState([]);
  const [agentEmail, setAgentEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [simCardDetails, setSimCardDetails] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/admin/agents')
      .then(res => res.json())
      .then(data => setAgents(data.agents || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSubmitting(true);
    const clientEmail = localStorage.getItem('username') || '';
    if (!agentEmail || !feedback) {
      setMessage('Please select an agent and enter feedback.');
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch('/api/simcard-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentEmail, clientEmail, feedback, simCardDetails })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setFeedback('');
        setSimCardDetails('');
        setAgentEmail('');
        setSubmitted(true);
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>SIM Card Feedback for Agent</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="agentEmail" style={styles.label}>Agent</label>
        <select
          id="agentEmail"
          value={agentEmail}
          onChange={e => setAgentEmail(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Select agent</option>
          {agents.map(agent => (
            <option key={agent.email} value={agent.email}>
              {agent.name} {agent.surname} ({agent.email})
            </option>
          ))}
        </select>

        <label htmlFor="feedback" style={styles.label}>Feedback</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          required
          rows={4}
          style={styles.textarea}
        />

        <label htmlFor="simCardDetails" style={styles.label}>
          SIM Card Details <span style={{ color: '#888', fontWeight: 'normal' }}>(optional)</span>
        </label>
        <input
          id="simCardDetails"
          value={simCardDetails}
          onChange={e => setSimCardDetails(e.target.value)}
          style={styles.input}
          placeholder="Optional details"
        />

        <button
          type="submit"
          disabled={submitting}
          style={{ 
            ...styles.button, 
            cursor: submitting ? 'not-allowed' : 'pointer',
            backgroundColor: submitting ? '#93c5fd' : '#2563eb'
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {message && (
        <div style={{ 
          marginTop: 18,
          textAlign: 'center',
          color: message.toLowerCase().includes('success') ? 'green' : '#b91c1c',
          fontWeight: 500
        }}>
          {message}
        </div>
      )}

      {submitted && (
        <button 
          style={styles.backButton} 
          onClick={() => {
            const role = localStorage.getItem('role');
            if (role === 'client') navigate('/client-dashboard');
            else if (role === 'agent') navigate('/agent-dashboard');
            else if (role === 'admin') navigate('/admin-dashboard');
            else navigate('/');
          }}
        >
          Back to Dashboard
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: '2rem auto',
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px #eee',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#2563eb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  label: {
    fontWeight: 600,
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    outlineColor: '#2563eb',
  },
  textarea: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    resize: 'vertical',
    outlineColor: '#2563eb',
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    outlineColor: '#2563eb',
  },
  button: {
    padding: '12px 0',
    borderRadius: 6,
    border: 'none',
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    transition: 'background-color 0.3s ease',
  },
  backButton: {
    marginTop: 12,
    width: '100%',
    padding: 12,
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#e0e7ff',
    color: '#2563eb',
    cursor: 'pointer',
  },
};

export default SimCardFeedback;
