import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPrice, setFilterPrice] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/listings");
        setListings(res.data);
      } catch (err) {
        alert("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filtered = listings.filter((l) => {
    const priceOk = !filterPrice || l.pricePerDay <= parseFloat(filterPrice);
    const availableOk = !onlyAvailable || l.isAvailable;
    const searchOk = !searchQuery || 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    return priceOk && availableOk && searchOk;
  });

  if (loading) return <p style={{ textAlign: "center" }}>Loading listings...</p>;

  return (
    <div style={{ 
      padding: "2rem",
      background: "linear-gradient(135deg, #3b5284 0%, #1f2a59 100%)",
      minHeight: "100vh"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        marginBottom: "1rem", 
        fontSize: "2rem",
        color: "white",
        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
      }}>
        Let's Dive!
      </h2>

      {/* Search Bar */}
      <div style={{
        maxWidth: "48rem",
        margin: "0 auto 3rem auto"
      }}>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: "0",
            background: "linear-gradient(to right, #3b82f6, #831843)",
            borderRadius: "1rem",
            filter: "blur(8px)",
            opacity: "0.3",
            transition: "opacity 0.3s"
          }}></div>
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",
            borderRadius: "1rem",
            padding: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}>
            <Search style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#9ca3af",
              marginLeft: "1rem"
            }} />
            <input
              type="text"
              placeholder="Search for cameras, bikes, tools, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: "1",
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "0.75rem 1rem",
                color: "white",
                fontSize: "1.125rem"
              }}
            />
            <button 
              onClick={() => {/* Search functionality is handled by the filter */}}
              style={{
                background: "linear-gradient(to right, #8b5cf6, #ec4899)",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "0.75rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
                transform: "scale(1)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.background = "linear-gradient(to right, #7c3aed, #db2777)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.background = "linear-gradient(to right, #8b5cf6, #ec4899)";
              }}
            >
              Search
              <ArrowRight style={{
                width: "1.25rem",
                height: "1.25rem",
                marginLeft: "0.5rem"
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem"
        }}
      >
        <input
          type="number"
          placeholder="Max Price per Day"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "1rem",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
            outline: "none"
          }}
        />
        <label style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem",
          color: "white",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "0.5rem 1rem",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          Only show available
        </label>
      </div>

      {/* Listings Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {filtered.map((item) => (
          <div
            key={item._id}
            style={{
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: favorites.includes(item._id)
                ? "0 8px 32px rgba(31, 38, 135, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)"
                : "0 8px 32px rgba(31, 38, 135, 0.37)",
              transition: "transform 0.3s, box-shadow 0.3s",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)", // Safari support
              cursor: "pointer",
              transform: "translateY(0)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 12px 40px rgba(31, 38, 135, 0.5), 0 0 25px rgba(255, 255, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = favorites.includes(item._id)
                ? "0 8px 32px rgba(31, 38, 135, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)"
                : "0 8px 32px rgba(31, 38, 135, 0.37)";
            }}
          >
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(item._id)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                zIndex: 10
              }}
              title="Add to favorites"
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "scale(1)";
              }}
            >
              {favorites.includes(item._id) ? "❤️" : "🤍"}
            </button>

            {/* Card Content */}
            <Link
              to={`/listings/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={item.images[0] || "https://via.placeholder.com/300x200"}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />
              <div style={{ padding: "1rem" }}>
                <h3
                  style={{
                    margin: "0 0 0.5rem",
                    fontSize: "1.2rem",
                    color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    height: "40px",
                    overflow: "hidden"
                  }}
                >
                  {item.description}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                    fontSize: "1rem",
                    color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                  }}
                >
                  ${item.pricePerDay}/day
                </p>
                <p style={{ 
                  color: "rgba(255, 255, 255, 0.7)", 
                  fontSize: "0.85rem" 
                }}>
                  Deposit: ${item.securityDeposit}
                </p>
                <p
                  style={{
                    color: item.isAvailable ? "#4ade80" : "#f87171",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    fontWeight: "500"
                  }}
                >
                  {item.isAvailable ? "✅ Available" : "❌ Not Available"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}