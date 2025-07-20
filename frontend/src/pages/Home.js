import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Star, Shield, Clock, Users, Camera, Bike, Gamepad2, Car, Home, Music, Sparkles, TrendingUp, Award, CheckCircle } from "lucide-react";

export default function HomeF() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { icon: Camera, name: "Photography", color: "from-purple-500 to-pink-500", count: "2.1k+" },
    { icon: Bike, name: "Sports", color: "from-green-500 to-teal-500", count: "1.8k+" },
    { icon: Gamepad2, name: "Gaming", color: "from-blue-500 to-indigo-500", count: "1.5k+" },
    { icon: Car, name: "Vehicles", color: "from-red-500 to-orange-500", count: "950+" },
    { icon: Home, name: "Home & Garden", color: "from-yellow-500 to-amber-500", count: "1.2k+" },
    { icon: Music, name: "Audio", color: "from-indigo-500 to-purple-500", count: "800+" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Photographer",
      content: "Rentagram helped me access premium equipment I couldn't afford to buy. The quality and service are exceptional!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Adventure Enthusiast",
      content: "Perfect for trying gear before buying. I've discovered so many new hobbies through this platform!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emma Williams",
      role: "Content Creator",
      content: "The variety of equipment available is incredible. It's like having access to a professional studio anywhere!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const stats = [
    { label: "Active Listings", value: "50,000+", icon: TrendingUp },
    { label: "Happy Users", value: "25,000+", icon: Users },
    { label: "Cities", value: "150+", icon: Award },
    { label: "Trust Score", value: "4.9/5", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div> */}

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              RentaGram
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of sharing. Rent anything, anywhere, anytime. 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 font-semibold"> Your next adventure awaits!</span>
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-900 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search for cameras, bikes, tools, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-400 text-lg"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center">
                  Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <span className="flex items-center">
                Start Renting
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                List Your Items
                <CheckCircle className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center transform transition-all duration-1000 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-800 to-pink-400 bg-clip-text text-transparent">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 hover:bg-white/20 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <category.icon className="w-12 h-12 mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold text-center mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-sm text-center">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">100% Secure</h3>
            <p className="text-gray-300">Your transactions are protected with bank-level security and insurance coverage.</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instant Booking</h3>
            <p className="text-gray-300">Book items instantly and get them delivered to your doorstep within hours.</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Trusted Community</h3>
            <p className="text-gray-300">Join thousands of verified users sharing and renting with confidence.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-800 to-pink-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the sharing economy revolution. Rent, list, and discover amazing items in your neighborhood.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
              Get Started Now
            </button>
            <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}