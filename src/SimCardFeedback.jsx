
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
    <div className="card" style={{ maxWidth: 500, margin: '2rem auto', boxShadow: '0 2px 8px #eee', padding: 24, borderRadius: 12, background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>SIM Card Feedback for Agent</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label htmlFor="agentEmail" style={{ fontWeight: 500 }}>Agent</label>
          <select id="agentEmail" value={agentEmail} onChange={e => setAgentEmail(e.target.value)} required style={{ width: '100%', padding: 8, marginTop: 4 }}>
            <option value="">Select agent</option>
            {agents.map(agent => (
              <option key={agent.email} value={agent.email}>{agent.name} {agent.surname} ({agent.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="feedback" style={{ fontWeight: 500 }}>Feedback</label>
          <textarea id="feedback" value={feedback} onChange={e => setFeedback(e.target.value)} required rows={4} style={{ width: '100%', padding: 8, marginTop: 4, resize: 'vertical' }} />
        </div>
        <div>
          <label htmlFor="simCardDetails" style={{ fontWeight: 500 }}>SIM Card Details <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></label>
          <input id="simCardDetails" value={simCardDetails} onChange={e => setSimCardDetails(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </div>
        <button type="submit" disabled={submitting} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: submitting ? 'not-allowed' : 'pointer', marginTop: 8 }}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {message && <div style={{ marginTop: 18, textAlign: 'center', color: message.includes('success') ? 'green' : '#b91c1c', fontWeight: 500 }}>{message}</div>}
      {submitted && (
        <button style={{marginTop:12}} onClick={() => {
          const role = localStorage.getItem('role');
          if (role === 'client') navigate('/client-dashboard');
          else if (role === 'agent') navigate('/agent-dashboard');
          else if (role === 'admin') navigate('/admin-dashboard');
          else navigate('/');
        }}>
          Back to Dashboard
        </button>
      )}
    </div>
  );
};

export default SimCardFeedback;
