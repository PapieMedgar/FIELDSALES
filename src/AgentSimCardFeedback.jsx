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
        setFeedbacks((data.feedbacks || []).sort((a, b) => b.timestamp - a.timestamp));
        setLoading(false);
      });
  }, [agentEmail]);

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>SIM Card Feedback Received</h2>
      {loading ? (
        <p style={styles.centerText}>Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p style={{ ...styles.centerText, color: '#888' }}>No feedback yet.</p>
      ) : (
        <div style={styles.feedbackList}>
          {feedbacks.map((fb, i) => (
            <div key={i} style={styles.feedbackItem}>
              <div style={styles.feedbackLine}>
                <span style={styles.label}>From:</span> {fb.clientEmail}
              </div>
              <div style={styles.feedbackLine}>
                <span style={styles.label}>Feedback:</span> {fb.feedback}
              </div>
              {fb.simCardDetails && (
                <div style={styles.feedbackLine}>
                  <span style={styles.label}>SIM Card Details:</span> {fb.simCardDetails}
                </div>
              )}
              <div style={styles.timestamp}>
                {new Date(fb.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 600,
    margin: '2rem auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '1.5rem 1rem',
    borderRadius: 12,
    background: '#fff',
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 600,
    color: '#1f2937',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
  },
  feedbackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  feedbackItem: {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 16,
    background: '#f9fafb',
  },
  feedbackLine: {
    marginBottom: 6,
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    color: '#374151',
  },
  label: {
    fontWeight: 500,
    color: '#2563eb',
  },
  timestamp: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
  },
};

export default AgentSimCardFeedback;
