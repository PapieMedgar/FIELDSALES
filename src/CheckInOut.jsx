import React, { useState } from 'react';

const CheckInOut = () => {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');

  const handleAction = async (action) => {
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus(action);
        try {
          const username = localStorage.getItem('username') || 'agent';
          const res = await fetch('http://localhost:4000/api/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username,
              action,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          setMessage(
            `${data.message} at (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`
          );
        } catch (err) {
          setMessage(err.message);
        }
      },
      () => setMessage('Unable to retrieve your location')
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Check In / Check Out</h2>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => handleAction('checkin')}>
          Check In
        </button>
        <button style={styles.button} onClick={() => handleAction('checkout')}>
          Check Out
        </button>
      </div>
      {status && location && (
        <div style={styles.statusBox}>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
          <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
        </div>
      )}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 480,
    margin: '2rem auto',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: 12,
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: '#2563eb',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  button: {
    flex: '1 1 120px',
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4f8cff',
    color: '#fff',
    fontWeight: 600,
    transition: 'background-color 0.3s ease',
  },
  statusBox: {
    backgroundColor: '#f0f9ff',
    padding: '1rem',
    borderRadius: 8,
    marginBottom: 16,
    fontSize: '1rem',
    color: '#1e40af',
  },
  message: {
    textAlign: 'center',
    color: '#dc2626',
    fontWeight: 600,
    fontSize: '1rem',
  },
};

export default CheckInOut;
