import React from 'react';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto', padding: 24, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Client Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: 18 }}>
        <li style={{ marginBottom: 18 }}>
          <Link to="/client-dashboard">My Dashboard</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/client-feedback">Submit FICA & Feedback</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/simcard-feedback">SIM Card Feedback for Agent</Link>
        </li>
      </ul>
    </div>
  );
};

export default ClientDashboard;
