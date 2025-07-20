import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Edit3, Trash2, Save, X, DollarSign, FileText, Tag, Grid, AlertTriangle, CheckCircle } from "lucide-react";

function MyListings() {
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", pricePerDay: "", description: "", securityDeposit: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/listings/me");
      setListings(res.data);
    } catch (err) {
      console.error("Failed to load listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/listings/${id}`);
      setListings(listings.filter((item) => item._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleEdit = (listing) => {
    setEditingId(listing._id);
    setForm({
      title: listing.title || "",
      pricePerDay: listing.pricePerDay || "",
      description: listing.description || "",
      securityDeposit: listing.securityDeposit || ""
    });
  };

  const handleSave = async (id) => {
    try {
      setSaving(true);
      const payload = {
        title: form.title,
        pricePerDay: Number(form.pricePerDay),
        description: form.description,
        securityDeposit: Number(form.securityDeposit)
      };

      await axios.patch(`/listings/${id}`, payload);

      setEditingId(null);
      fetchListings(); // reload listings after update
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert("Failed to update listing");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-8 text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 via-blue-900 to-slate-900 text-white overflow-hidden p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div> */}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight flex items-center justify-center">
            {/* <Grid className="w-10 h-10 mr-3 text-blue-300" /> */}
            Wanna make some changes?
          </h1>
          
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-12 text-center">
            <Grid className="w-16 h-16 mx-auto mb-4 text-white/40" />
            <h3 className="text-2xl font-semibold text-white mb-2">No listings yet</h3>
            <p className="text-white/60 text-lg">You haven't created any listings!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => (
              <div key={item._id} className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                {/* Image */}
                {item.images && item.images[0] && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}

                <div className="p-6">
                  {editingId === item._id ? (
                    <div className="space-y-4">
                      {/* Edit Form */}
                      <div className="space-y-3">
                        <div className="relative group">
                          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Title"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                          />
                        </div>

                        <div className="relative group">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-300" />
                          <input
                            type="number"
                            value={form.pricePerDay}
                            onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
                            placeholder="Price per day"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300"
                          />
                        </div>

                        <div className="relative group">
                          <FileText className="absolute left-3 top-3 w-4 h-4 text-purple-300" />
                          <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Description"
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 resize-none"
                          />
                        </div>

                        <div className="relative group">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-300" />
                          <input
                            type="number"
                            value={form.securityDeposit}
                            onChange={(e) => setForm({ ...form, securityDeposit: e.target.value })}
                            placeholder="Security deposit"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleSave(item._id)}
                          disabled={saving}
                          className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center"
                        >
                          {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Display Mode */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-green-300 flex items-center">
                            <DollarSign className="w-5 h-5 mr-1" />
                            {item.pricePerDay}
                            <span className="text-sm text-white/60 ml-1">/day</span>
                          </span>
                          <span className="text-white/80 flex items-center text-sm">
                            <span className="text-white-300">Deposit: ${item.securityDeposit}</span>
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-white/70 text-sm line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                        >
                        {/* className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center"> */}

                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item._id)}
                            className="flex-3 py-1 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-xl rounded-xl transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                <h3 className="text-2xl font-bold text-white mb-2">Delete Listing?</h3>
                <p className="text-white/70 mb-6">
                  Are you sure you want to delete this listing? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyListings;