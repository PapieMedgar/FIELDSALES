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
        body: formData
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
    <div>
      <h3>Advertisement Boards</h3>
      <form onSubmit={handleSubmit}>
        <input type="number" value={numBoards} onChange={e => setNumBoards(e.target.value)} placeholder="Number of Boards" required />
        <input type="text" value={radius} onChange={e => setRadius(e.target.value)} placeholder="Tuckshop Radius (meters)" required />
        <input type="text" value={position} onChange={e => setPosition(e.target.value)} placeholder="Board Position Description" required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdBoards;
