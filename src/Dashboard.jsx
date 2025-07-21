import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Field Agent Dashboard</h2>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/storevisits" style={{ marginRight: 12 }}>Store Visits</Link>
        <Link to="/pinstore" style={{ marginRight: 12 }}>Pin Store</Link>
        <Link to="/check" style={{ marginRight: 12 }}>Check In/Out</Link>
        <Link to="/adboards" style={{ marginRight: 12 }}>Ad Boards</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
