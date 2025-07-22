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
    <div className="container">
      <h2>Pin Store Location</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={storeName}
          onChange={e => setStoreName(e.target.value)}
          placeholder="Store Name"
          required
        />
        <button type="button" onClick={handlePinLocation}>
          Pin Location
        </button>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {submitted && (
        <button style={{marginTop:12}} onClick={() => navigate('/agent-dashboard')}>Proceed to Dashboard</button>
      )}
      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={15} style={{ height: 300, marginTop: 20 }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Pinned Location</Popup>
          </Marker>
        </MapContainer>
      )}
      <h3>Today's Visits</h3>
      <ul>
        {visits.map((v, i) => (
          <li key={i}>{v.storeName} @ ({v.location.lat}, {v.location.lng}) {new Date(v.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default StoreVisits;
