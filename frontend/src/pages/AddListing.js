import { useState } from "react";
import axios from "../api/axios";
import { Upload, X, Plus, Image, DollarSign, FileText, Tag } from "lucide-react";

export default function AddListing() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    securityDeposit: "",
    images: [], // base64 or URL
  });

  const [previews, setPreviews] = useState([]);
  const [dragOver, setDragOver] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;

    const updatedPreviews = [...previews];
    updatedPreviews[index] = value;

    setForm((prev) => ({ ...prev, images: updatedImages }));
    setPreviews(updatedPreviews);
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => handleImageChange(index, reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragOver(-1);
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => handleImageChange(index, reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, images: updatedImages }));
    setPreviews(updatedPreviews);
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
    setPreviews((prev) => [...prev, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        ...form,
        pricePerDay: parseFloat(form.pricePerDay),
        securityDeposit: parseFloat(form.securityDeposit),
      };
      await axios.post("/listings", data);
      alert("Listing created!");
      // navigate("/listings");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to create listing"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 via-blue-900 to-slate-900 text-white overflow-hidden p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div> */}
      </div>

      <div className="relative max-w-2xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight p-4">
            First step for some extra 💸
          </h1>
          
        </div>

        {/* Main Form Card */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Title Section */}
            <div className="space-y-2">
              <label className="flex items-center text-white font-medium text-lg mb-3">
                <Tag className="w-5 h-5 mr-2 text-blue-300" />
                Listing Title
              </label>
              <div className="relative group">
                <input
                  name="title"
                  placeholder="Give your listing an amazing title..."
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-lg"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="flex items-center text-white font-medium text-lg mb-3">
                <FileText className="w-5 h-5 mr-2 text-purple-300" />
                Description
              </label>
              <div className="relative group">
                <textarea
                  name="description"
                  placeholder="Describe what makes your listing special..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-lg resize-none"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium text-lg mb-3">
                  <DollarSign className="w-5 h-5 mr-2 text-green-300" />
                  Price per Day
                </label>
                <div className="relative group">
                  <input
                    name="pricePerDay"
                    type="number"
                    placeholder="100"
                    value={form.pricePerDay}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 text-lg"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium text-lg mb-3">
                  <DollarSign className="w-5 h-5 mr-2 text-yellow-300" />
                  Security Deposit
                </label>
                <div className="relative group">
                  <input
                    name="securityDeposit"
                    type="number"
                    placeholder="200"
                    value={form.securityDeposit}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 text-lg"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <label className="flex items-center text-white font-medium text-xl mb-4">
                <Image className="w-6 h-6 mr-2 text-pink-300" />
                Images
              </label>
              
              <div className="grid gap-4">
                {form.images.map((img, idx) => (
                  <div key={idx} className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/20 p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* URL Input */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={img}
                          onChange={(e) => handleImageChange(idx, e.target.value)}
                          placeholder={`Image URL #${idx + 1}`}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300"
                        />
                      </div>
                      
                      {/* File Upload */}
                      <div className="flex-1">
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                            dragOver === idx 
                              ? 'border-pink-400 bg-pink-400/10' 
                              : 'border-white/30 hover:border-pink-400/50'
                          }`}
                          onDrop={(e) => handleDrop(e, idx)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(idx);
                          }}
                          onDragLeave={() => setDragOver(-1)}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, idx)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="text-center">
                            <Upload className="w-6 h-6 mx-auto mb-2 text-white/60" />
                            <p className="text-white/60 text-sm">
                              Drop image or click to browse
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="self-start p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all duration-300 backdrop-blur-sm border border-red-400/30"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Preview */}
                    {previews[idx] && (
                      <div className="mt-4">
                        <img
                          src={previews[idx]}
                          alt={`Preview ${idx + 1}`}
                          className="w-32 h-32 object-cover rounded-xl border-2 border-white/20 shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Image Button */}
              <button
                type="button"
                onClick={addImageField}
                className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium transition-all duration-300 flex items-center justify-center group"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Add Image
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Creating Listing...
                </div>
              ) : (
                'Create Listing'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}