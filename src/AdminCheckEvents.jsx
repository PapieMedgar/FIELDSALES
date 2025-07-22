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
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin: All Check In/Out Events</h2>

      <label style={styles.label}>
        Filter by date:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={styles.dateInput}
        />
      </label>

      <h3 style={styles.subheading}>Total Events: {events.length}</h3>

      <ul style={styles.list}>
        {events.length === 0 && <li style={styles.noData}>No events found.</li>}
        {events.map((e, i) => (
          <li key={i} style={styles.listItem}>
            <b>{e.username}</b>: {e.action} @ ({e.location.lat}, {e.location.lng}){' '}
            {new Date(e.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>

      <button style={styles.backBtn} onClick={() => navigate('/admin-dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: '2rem auto',
    padding: '1rem 1.5rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    color: '#4f8cff',
    marginBottom: '1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '600',
    marginBottom: '1.5rem',
    fontSize: '1rem',
    maxWidth: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dateInput: {
    marginTop: '0.5rem',
    padding: '8px 10px',
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    maxWidth: '100%',
  },
  subheading: {
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#333',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '1.5rem',
    maxHeight: 350,
    overflowY: 'auto',
    marginBottom: '1.5rem',
  },
  listItem: {
    marginBottom: '0.75rem',
    lineHeight: 1.4,
  },
  noData: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
  },
  backBtn: {
    alignSelf: 'center',
    padding: '10px 24px',
    backgroundColor: '#4f8cff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: '600',
    cursor: 'pointer',
    maxWidth: 200,
  },
};

export default AdminCheckEvents;
