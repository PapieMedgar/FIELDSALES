import React from 'react';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto', padding: 24, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Field Agent Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: 18 }}>
        <li style={{ marginBottom: 18 }}>
          <Link to="/dashboard">My Store Visits</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/check">Check In/Out</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/adboards">Ad Board Submission</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/agent-ad-feedback">Ad Feedback</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/agent-simcard-feedback">SIM Card Feedback Received</Link>
        </li>
      </ul>
    </div>
  );
};

export default AgentDashboard;
