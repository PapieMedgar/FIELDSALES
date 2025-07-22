import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto', padding: 24, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: 18 }}>
        <li style={{ marginBottom: 18 }}>
          <Link to="/admin/storevisits">All Store Visits</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/admin/checkevents">All Check In/Out Events</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/admin/add-agent">Register New Agent</Link>
        </li>
        <li style={{ marginBottom: 18 }}>
          <Link to="/admin/agent-reports">Agent Activity Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
