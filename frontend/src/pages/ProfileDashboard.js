import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import GlassCard from "../components/GlassCard";

export default function ProfileDashboard() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [listings, setListings] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchListings = async () => {
      try {
        const res = await axios.get("/listings/me");
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoadingListings(false);
      }
    };

    fetchUser();
    fetchListings();
  }, []);

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put("/users/me", {
        name: user.name,
        phone: user.phone,
      });
      setUser(res.data);
      setEditingProfile(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update profile.");
    }
  };

  if (loadingUser || loadingListings) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-white">
      {/* Profile Card */}
      <GlassCard>
        <h2 className="text-3xl font-semibold mb-6">My Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              disabled={!editingProfile}
              onChange={handleProfileChange}
              className="w-full p-3 rounded-md bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              disabled={!editingProfile}
              onChange={handleProfileChange}
              className="w-full p-3 rounded-md bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex space-x-4">
            {!editingProfile ? (
              <button
                onClick={() => {
                  setEditingProfile(true);
                  setMessage("");
                }}
                className="bg-#647000 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={updateProfile}
                  className="bg-#647000 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingProfile(false);
                    setMessage("");
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </GlassCard>

      {/* Listings Card */}
      <GlassCard>
        <h2 className="text-3xl font-semibold mb-6">My Listings</h2>
        {listings.length === 0 ? (
          <p>You have no listings yet.</p>
        ) : (
          <ul className="space-y-4">
            {listings.map((listing) => (
              <li
                key={listing._id}
                className="p-4 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-blue-900 hover:bg-opacity-50 transition"
              >
                <strong>{listing.title}</strong> — ${listing.pricePerDay} per day
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
