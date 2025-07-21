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
      setMessage('Store visit recorded!');
      setStoreName('');
      setLocation(null);
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
        {location && (
          <div>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PinStore;
