import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminStoreVisits = () => {
  const [visits, setVisits] = useState([]);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchVisits = async () => {
    let url = 'http://localhost:4000/api/admin/store-visits';
    if (date) url += `?date=${date}`;
    const res = await fetch(url);
    const data = await res.json();
    setVisits(data.visits || []);
  };

  useEffect(() => {
    fetchVisits();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="container">
      <h2>Admin: All Store Visits</h2>
      <label>
        Filter by date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <h3>Total Visits: {visits.length}</h3>
      <ul>
        {visits.map((v, i) => (
          <li key={i}>
            <b>{v.username}</b>: {v.storeName} @ ({v.location.lat}, {v.location.lng}) {new Date(v.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <button style={{marginTop:24}} onClick={() => navigate('/admin-dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminStoreVisits;
