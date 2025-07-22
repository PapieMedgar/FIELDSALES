import React, { useState } from 'react';

const PinStore = () => {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');

  const handlePinLocation = () => {
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setMessage('Location pinned!');
      },
      () => setMessage('Unable to retrieve your location')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeName || !location) {
      setMessage('Please enter store name and pin your location.');
      return;
    }
    try {
      const username = localStorage.getItem('username') || 'agent';
      const res = await fetch('http://localhost:4000/api/store-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, storeName, location })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Submission complete! Proceed to dashboard or next step.');
      setStoreName('');
      setLocation(null);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pin Store Location</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={storeName}
          onChange={e => setStoreName(e.target.value)}
          placeholder="Store Name"
          required
          style={styles.input}
        />
        <button type="button" onClick={handlePinLocation} style={styles.button}>
          Pin Location
        </button>
        {location && (
          <div style={styles.locationInfo}>
            <p>Latitude: {location.lat.toFixed(6)}</p>
            <p>Longitude: {location.lng.toFixed(6)}</p>
          </div>
        )}
        <button type="submit" style={{ ...styles.button, marginTop: 12 }}>
          Submit
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#4f8cff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: 8,
    border: '1px solid #ccc',
    outlineColor: '#4f8cff',
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#4f8cff',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  locationInfo: {
    fontSize: '0.9rem',
    color: '#555',
    backgroundColor: '#f0f4ff',
    padding: 12,
    borderRadius: 8,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4f8cff',
  },
};

export default PinStore;
