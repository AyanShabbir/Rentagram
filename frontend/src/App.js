import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import { isLoggedIn } from "./utils/auth";
import AddListing from "./pages/AddListing";
import ProtectedRoute from "./components/ProtectedRoutes";
import MyBookings from "./pages/MyBookings";
import MyListings from "./pages/MyListings";
// import Profile from "./pages/Profile";
// import Dashboard from './pages/Dashboard';
import ProfileDashboard from "./pages/ProfileDashboard";
import './index.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/ProfileDashboard" element={<ProfileDashboard />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/add-listing" element={isLoggedIn() ? <AddListing /> : <p>You must be logged in to create a listing.</p>} /> */}
        <Route path="/add-listing" element={ <ProtectedRoute> <AddListing /> </ProtectedRoute>}/>
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
      



      </Routes>
    </Router>
  );
}

export default App;