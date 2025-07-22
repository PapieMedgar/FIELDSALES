import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const StoreVisits = () => {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [visits, setVisits] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const username = localStorage.getItem('username') || 'agent';
  const navigate = useNavigate();

  const fetchVisits = async () => {
    const res = await fetch(`http://localhost:4000/api/store-visits?username=${username}`);
    const data = await res.json();
    setVisits(data.visits || []);
  };

  useEffect(() => {
    fetchVisits();
  }, []);

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
      setSubmitted(true);
      fetchVisits();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pin Store Location</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={storeName}
          onChange={e => setStoreName(e.target.value)}
          placeholder="Store Name"
          required
          style={styles.input}
        />
        <div style={styles.buttonRow}>
          <button type="button" onClick={handlePinLocation} style={{ ...styles.button, marginRight: 10 }}>
            Pin Location
          </button>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </div>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      {submitted && (
        <button
          style={{ ...styles.button, marginTop: 12, width: '100%' }}
          onClick={() => navigate('/agent-dashboard')}
        >
          Proceed to Dashboard
        </button>
      )}

      {location && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={15}
          style={{ height: 300, width: '100%', marginTop: 20, borderRadius: 8 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Pinned Location</Popup>
          </Marker>
        </MapContainer>
      )}

      <h3 style={{ marginTop: 30, marginBottom: 12 }}>Today's Visits</h3>
      <ul style={styles.visitList}>
        {visits.map((v, i) => (
          <li key={i} style={styles.visitItem}>
            {v.storeName} @ ({v.location.lat.toFixed(4)}, {v.location.lng.toFixed(4)}) —{' '}
            {new Date(v.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    color: '#2563eb',
    marginBottom: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginBottom: 12,
    outlineColor: '#2563eb',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    flexGrow: 1,
    minWidth: 120,
    marginBottom: 10,
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    color: '#b91c1c',
    fontWeight: 500,
  },
  visitList: {
    listStyle: 'none',
    padding: 0,
    maxHeight: 200,
    overflowY: 'auto',
  },
  visitItem: {
    padding: '8px 12px',
    borderBottom: '1px solid #eee',
    fontSize: 14,
    color: '#333',
  },
};

export default StoreVisits;
