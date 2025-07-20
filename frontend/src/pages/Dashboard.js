// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/users/me');
        setUser(userRes.data);

        const listingsRes = await axios.get('/listings/me'); // assumes you have a listings/mine route
        setListings(listingsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {user && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <p className="text-lg">👋 Welcome, <strong>{user.name}</strong></p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone || 'Not set'}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
        {listings.length === 0 ? (
          <p>No listings found. <Link className="text-blue-500" to="/create-listing">Create one now</Link>.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <li key={listing._id} className="bg-white p-4 shadow rounded">
                <h3 className="font-bold">{listing.title}</h3>
                <p>{listing.description.slice(0, 60)}...</p>
                <Link to={`/listing/${listing._id}`} className="text-blue-500">View</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
