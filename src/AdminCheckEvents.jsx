import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCheckEvents = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchEvents = async () => {
    let url = 'http://localhost:4000/api/admin/check-events';
    if (date) url += `?date=${date}`;
    const res = await fetch(url);
    const data = await res.json();
    setEvents(data.events || []);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="container">
      <h2>Admin: All Check In/Out Events</h2>
      <label>
        Filter by date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <h3>Total Events: {events.length}</h3>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <b>{e.username}</b>: {e.action} @ ({e.location.lat}, {e.location.lng}) {new Date(e.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <button style={{marginTop:24}} onClick={() => navigate('/admin-dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminCheckEvents;
