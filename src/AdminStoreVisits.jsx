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
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin: All Store Visits</h2>
      <label style={styles.label}>
        Filter by date:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={styles.dateInput}
        />
      </label>
      <h3 style={styles.subheading}>Total Visits: {visits.length}</h3>
      <ul style={styles.list}>
        {visits.map((v, i) => (
          <li key={i} style={styles.listItem}>
            <b>{v.username}</b>: {v.storeName} @ ({v.location.lat.toFixed(4)}, {v.location.lng.toFixed(4)}){' '}
            {new Date(v.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <button style={styles.button} onClick={() => navigate('/admin-dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 700,
    margin: '2rem auto',
    padding: '1rem 1.5rem',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1f2937',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#4f8cff',
  },
  label: {
    marginBottom: '1rem',
    fontSize: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  dateInput: {
    padding: '0.4rem 0.6rem',
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    maxWidth: '200px',
  },
  subheading: {
    fontSize: '1.125rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  list: {
    maxHeight: '50vh',
    overflowY: 'auto',
    paddingLeft: '1rem',
    marginBottom: '1.5rem',
  },
  listItem: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
    fontSize: '1rem',
    wordBreak: 'break-word',
  },
  button: {
    alignSelf: 'center',
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#4f8cff',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(79, 140, 255, 0.5)',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminStoreVisits;
