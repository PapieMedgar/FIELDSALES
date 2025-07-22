
import React, { useEffect, useState } from 'react';

const AgentSimCardFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const agentEmail = localStorage.getItem('username') || '';

  useEffect(() => {
    if (!agentEmail) return;
    fetch(`/api/agent/simcard-feedback?agentEmail=${encodeURIComponent(agentEmail)}`)
      .then(res => res.json())
      .then(data => {
        // Sort feedbacks by most recent first
        setFeedbacks((data.feedbacks || []).sort((a, b) => b.timestamp - a.timestamp));
        setLoading(false);
      });
  }, [agentEmail]);

  return (
    <div className="card" style={{ maxWidth: 600, margin: '2rem auto', boxShadow: '0 2px 8px #eee', padding: 24, borderRadius: 12, background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>SIM Card Feedback Received</h2>
      {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
        feedbacks.length === 0 ? <p style={{ textAlign: 'center', color: '#888' }}>No feedback yet.</p> :
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {feedbacks.map((fb, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, background: '#f9fafb' }}>
              <div style={{ marginBottom: 6 }}><span style={{ fontWeight: 500, color: '#2563eb' }}>From:</span> {fb.clientEmail}</div>
              <div style={{ marginBottom: 6 }}><span style={{ fontWeight: 500 }}>Feedback:</span> {fb.feedback}</div>
              {fb.simCardDetails && <div style={{ marginBottom: 6 }}><span style={{ fontWeight: 500 }}>SIM Card Details:</span> {fb.simCardDetails}</div>}
              <div style={{ fontSize: 13, color: '#888' }}>{new Date(fb.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentSimCardFeedback;
