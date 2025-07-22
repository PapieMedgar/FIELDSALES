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
          lng: position.coords.longitude
        });
        setStatus(action);
        try {
          const username = localStorage.getItem('username') || 'agent';
          const res = await fetch('http://localhost:4000/api/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, action, location: { lat: position.coords.latitude, lng: position.coords.longitude } })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          setMessage(data.message + ` at (${position.coords.latitude}, ${position.coords.longitude})`);
        } catch (err) {
          setMessage(err.message);
        }
      },
      () => setMessage('Unable to retrieve your location')
    );
  };

  return (
    <div className="container">
      <h2>Check In / Check Out</h2>
      <button onClick={() => handleAction('checkin')}>Check In</button>
      <button onClick={() => handleAction('checkout')}>Check Out</button>
      {status && location && (
        <div>
          <p>Status: {status}</p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckInOut;
