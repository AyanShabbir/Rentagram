import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // or wherever it's located

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/users/me');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('/users/me', {
        name: user.name,
        phone: user.phone,
      });
      setUser(res.data);
      setEditing(false);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>My Profile</h2>
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>
      <div>
        <label>Email:</label>
        <input value={user.email} disabled />
      </div>
      <div>
        <label>Phone:</label>
        <input
          name="phone"
          value={user.phone || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>
      {!editing ? (
        <button onClick={() => setEditing(true)}>Edit</button>
      ) : (
        <>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
