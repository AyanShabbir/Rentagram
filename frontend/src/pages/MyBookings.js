  import React, { useEffect, useState } from "react";
  import axios from "../api/axios";

  function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
      fetchBookings();
    }, []);

    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/me");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };

    const handleCancel = async (id) => {
      if (!window.confirm("Cancel this booking?")) return;
      try {
        await axios.delete(`/bookings/${id}`);
        setBookings(bookings.filter((b) => b._id !== id));
      } catch (err) {
        alert("Failed to cancel booking");
      }
    };

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      gap: "1.5rem",
    };

    const cardStyle = {
      background: "linear-gradient(to right, rgba(59,130,246,0.2), rgba(168,85,247,0.2))",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "1.5rem",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      width: "100%",
      maxWidth: "500px",
      color: "#fff",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    };

    const buttonStyle = {
      backgroundColor: "#ef4444",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      marginTop: "1rem",
    };

    return (
      <div style={containerStyle}>
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>My Bookings</h2>
        {bookings.length === 0 ? (
          <p style={{ color: "#ccc" }}>You have no bookings.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} style={cardStyle}>
              <h3 style={{ marginBottom: "0.5rem" }}>
                {b.listing?.title || "Listing not found"}
              </h3>
              <p style={{ margin: "0.5rem 0" }}>
                📅 {b.startDate.slice(0, 10)} to {b.endDate.slice(0, 10)}
              </p>
              <p style={{ margin: "0.5rem 0" }}>
                💵 ${b.totalPrice}{" "}
                <strong>{b.isPaid ? "(Paid)" : "(Not Paid)"}</strong>
              </p>
              <button style={buttonStyle} onClick={() => handleCancel(b._id)}>
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    );
  }

  export default MyBookings;
