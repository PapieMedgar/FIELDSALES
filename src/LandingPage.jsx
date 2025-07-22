import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h1 style={{
        color: '#4f8cff',
        fontWeight: 700,
        letterSpacing: 1,
        margin: '0 0 20px',
        fontSize: '2.5rem',
      }}>
        Field Sales
      </h1>
      <h2 style={{ color: '#222', margin: '0 0 15px' }}>
        Welcome to the Management Portal
      </h2>
      <p style={{
        maxWidth: '600px',
        margin: '0 auto 30px',
        color: '#555',
        lineHeight: 1.6,
      }}>
        Streamline your sales operations, monitor performance, and gain insights—all in one place.
      </p>
      <div style={{ display: 'inline-flex', gap: '30px' }}>
        <Link
          to="/login"
          style={{
            backgroundColor: '#4f8cff',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '12px',
            fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 4px 8px rgba(79, 140, 255, 0.5)',
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            backgroundColor: '#7aa9ff',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '12px',
            fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 4px 8px rgba(122, 169, 255, 0.5)',
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
