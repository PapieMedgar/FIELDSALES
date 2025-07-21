import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const StoreVisits = () => {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [visits, setVisits] = useState([]);
  const username = localStorage.getItem('username') || 'agent';

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
      setMessage('Store visit recorded!');
      setStoreName('');
      setLocation(null);
      fetchVisits();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Store Visits Today</h2>
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
        {location && (
          <div>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Visited Stores ({visits.length})</h3>
      <ul>
        {visits.map((v, i) => (
          <li key={i}>
            {v.storeName} @ ({v.location.lat}, {v.location.lng})
          </li>
        ))}
      </ul>
      {visits.length > 0 && (
        <div style={{ height: 400, marginTop: 20 }}>
          <MapContainer center={[visits[0].location.lat, visits[0].location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {visits.map((v, i) => (
              <Marker key={i} position={[v.location.lat, v.location.lng]}>
                <Popup>
                  {v.storeName}<br />({v.location.lat}, {v.location.lng})
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default StoreVisits;
