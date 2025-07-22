import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Field Sales</h1>
      <h2 style={styles.subtitle}>Welcome to the Management Portal</h2>
      <p style={styles.description}>
        Streamline your sales operations, monitor performance, and gain insights—all in one place.
      </p>
      <div style={styles.buttonGroup}>
        <Link to="/login" style={styles.loginBtn}>
          Login
        </Link>
        <Link to="/signup" style={styles.registerBtn}>
          Register
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem 1rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '960px',
    margin: '0 auto',
  },
  title: {
    color: '#4f8cff',
    fontWeight: 700,
    letterSpacing: '1px',
    marginBottom: '0.5rem',
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
  },
  subtitle: {
    color: '#222',
    marginBottom: '1rem',
    fontSize: 'clamp(1.25rem, 4vw, 2rem)',
  },
  description: {
    maxWidth: '640px',
    margin: '0 auto 2rem',
    color: '#555',
    lineHeight: 1.6,
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  loginBtn: {
    backgroundColor: '#4f8cff',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '12px',
    fontWeight: '600',
    textDecoration: 'none',
    boxShadow: '0 4px 8px rgba(79, 140, 255, 0.5)',
    minWidth: '140px',
    textAlign: 'center',
  },
  registerBtn: {
    backgroundColor: '#7aa9ff',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '12px',
    fontWeight: '600',
    textDecoration: 'none',
    boxShadow: '0 4px 8px rgba(122, 169, 255, 0.5)',
    minWidth: '140px',
    textAlign: 'center',
  },
};

export default LandingPage;
