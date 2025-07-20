import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/login");
  };

  const baseNavStyles = {
    background: "rgba(31, 42, 89, 0.8)",
    backdropFilter: "blur(16px)",
    color: "white",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "0.75rem 1.5rem",
    borderBottomLeftRadius: "0.75rem",
    borderBottomRightRadius: "0.75rem"
  };

  const linkStyles = {
    color: "#bfc7e5",
    textDecoration: "none",
    transition: "all 0.2s",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    display: "block",
    whiteSpace: "nowrap"
  };

  const NavLink = ({ to, children, onClick = null }) => (
    <Link
      to={to}
      onClick={(e) => {
        if (onClick) onClick(e);
        setIsMobileMenuOpen(false);
      }}
      style={linkStyles}
      onMouseEnter={(e) => {
        e.target.style.color = "white";
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.target.style.color = "#bfc7e5";
        e.target.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </Link>
  );

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/listings", label: "Listings" },
    ...(!isAuthenticated ? [
      { to: "/register", label: "Register" },
      { to: "/login", label: "Login" }
    ] : [])
  ];

  const privateLinks = isAuthenticated ? [
    { to: "/add-listing", label: "Add Listing" },
    { to: "/my-listings", label: "My Listings" },
    { to: "/my-bookings", label: "My Bookings" },
    { to: "/ProfileDashboard", label: "Profile" }
  ] : [];

  const allLinks = [...publicLinks, ...privateLinks];

  return (
    <nav style={baseNavStyles}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "100%"
      }}>
        {/* Logo/Brand */}
        <Link 
          to="/" 
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "white",
            textDecoration: "none",
            marginRight: "1rem"
          }}
        >
          R.
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flex: 1,
          justifyContent: "space-between"
        }}>
          {/* Desktop Links */}
          <div style={{
            display: "none",
            gap: "0.25rem",
            alignItems: "center"
          }}
          className="desktop-nav">
            {allLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Logout Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {isAuthenticated && (
              <button
                onClick={logout}
                style={{
                  background: "#db2777",
                  color: "white",
                  fontWeight: "600",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  display: "none"
                }}
                className="desktop-logout"
                onMouseEnter={(e) => e.target.style.background = "#be185d"}
                onMouseLeave={(e) => e.target.style.background = "#db2777"}
              >
                Logout
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "0.5rem",
                display: "block"
              }}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          background: "rgba(31, 42, 89, 0.95)",
          backdropFilter: "blur(16px)",
          padding: "1rem",
          marginTop: "0.75rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          animation: "slideDown 0.2s ease-out"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            {allLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  background: "#db2777",
                  color: "white",
                  fontWeight: "600",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.background = "#be185d"}
                onMouseLeave={(e) => e.target.style.background = "#db2777"}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-logout {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}