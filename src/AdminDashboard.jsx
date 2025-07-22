import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/admin/storevisits" style={styles.link}>All Store Visits</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/admin/checkevents" style={styles.link}>All Check In/Out Events</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/admin/add-agent" style={styles.link}>Register New Agent</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/admin/agent-reports" style={styles.link}>Agent Activity Reports</Link>
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
    background: '#fff',
    boxShadow: '0 2px 8px #eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: '#4f8cff',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  listItem: {
    marginBottom: 0, // handled by gap
  },
  link: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    textDecoration: 'none',
    color: '#1f2937',
    padding: '12px 18px',
    borderRadius: 8,
    backgroundColor: '#f0f4ff',
    boxShadow: '0 2px 4px rgba(79, 140, 255, 0.2)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    display: 'block',
    textAlign: 'center',
  },
  linkHover: {
    backgroundColor: '#4f8cff',
    color: 'white',
    boxShadow: '0 4px 12px rgba(79, 140, 255, 0.6)',
  },
};

export default AdminDashboard;
