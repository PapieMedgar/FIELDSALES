import React from 'react';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Client Dashboard</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link style={styles.link} to="/client-dashboard">My Dashboard</Link>
        </li>
        <li style={styles.listItem}>
          <Link style={styles.link} to="/client-feedback">Submit FICA & Feedback</Link>
        </li>
        <li style={styles.listItem}>
          <Link style={styles.link} to="/simcard-feedback">SIM Card Feedback for Agent</Link>
        </li>
      </ul>
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
    boxShadow: '0 2px 8px #eee',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: '90%',  // responsive width for small screens
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: '#2563eb',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
  },
  listItem: {
    marginBottom: 18,
  },
  link: {
    color: '#4f8cff',
    textDecoration: 'none',
    fontWeight: 600,
    display: 'inline-block',
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
    transition: 'background-color 0.3s ease',
  },
};

export default ClientDashboard;
