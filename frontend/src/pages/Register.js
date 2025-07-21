import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registered! Please login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Inline styles
  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to right,from-white-900 via-blue-900)",
      padding: "2rem",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "2rem",
      borderRadius: "1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(12px)",
      color: "white",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    input: {
      paddingLeft: "1rem",        // px-4
      paddingRight: "1rem",       // px-4
      paddingTop: "0.75rem",      // py-3
      paddingBottom: "0.75rem",   // py-3
      borderRadius: "0.75rem",    // rounded-xl = 12px
      backgroundColor: "rgba(255, 255, 255, 0.2)", // bg-white/20
      color: "white",             // text-white
      border: "1px solid rgba(255, 255, 255, 0.2)", // border-white/20
      outline: "none",            // focus:outline-none
      fontSize: "1rem",           // Tailwind default
      "::placeholder": {
        color: "#D1D5DB"          // placeholder-gray-300 (hex of Tailwind gray-300)
      },
      ":focus": {
        boxShadow: "0 0 0 2px white" // focus:ring-2 focus:ring-white
      }
    },



    button: {
      width: "100%",
      padding: "1rem",
      border: "none",
      borderRadius: "16px",
      backgroundImage: "linear-gradient(to right, #a855f7, #ec4899)",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    },
    buttonHover: {
      backgroundImage: "linear-gradient(to right, #9333ea, #db2777)",
      transform: "scale(1.05)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Cheers to new beginnings 🥂</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
