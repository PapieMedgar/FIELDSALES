import React, { useState } from 'react';

const AdBoards = () => {
  const [numBoards, setNumBoards] = useState('');
  const [radius, setRadius] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numBoards || !radius || !position || !image) {
      setMessage('Please fill all fields and select an image.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('username', localStorage.getItem('username') || 'agent');
      formData.append('numBoards', numBoards);
      formData.append('radius', radius);
      formData.append('position', position);
      formData.append('image', image);
      const res = await fetch('http://localhost:4000/api/adboards', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Ad board info submitted!');
      setNumBoards('');
      setRadius('');
      setPosition('');
      setImage(null);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Advertisement Boards</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          value={numBoards}
          onChange={(e) => setNumBoards(e.target.value)}
          placeholder="Number of Boards"
          required
          style={styles.input}
        />
        <input
          type="text"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Tuckshop Radius (meters)"
          required
          style={styles.input}
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Board Position Description"
          required
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={styles.fileInput}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '480px',
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    color: '#4f8cff',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outlineColor: '#4f8cff',
  },
  fileInput: {
    padding: '6px 12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outlineColor: '#4f8cff',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4f8cff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
};

// You can add media queries in CSS for more control or use styled-components for cleaner styles.

export default AdBoards;
