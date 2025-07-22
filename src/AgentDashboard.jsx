import React from 'react';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Field Agent Dashboard</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/dashboard" style={styles.link}>My Store Visits</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/check" style={styles.link}>Check In/Out</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/adboards" style={styles.link}>Ad Board Submission</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/agent-ad-feedback" style={styles.link}>Ad Feedback</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/agent-simcard-feedback" style={styles.link}>SIM Card Feedback Received</Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1.5rem 2rem',
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1f2937',
    boxSizing: 'border-box',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 600,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
  },
  listItem: {
    marginBottom: 18,
  },
  link: {
    color: '#4f8cff',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  // Optional: add hover effect to links
  // For inline styles hover is tricky, so you might want to use CSS for that
};

export default AgentDashboard;
