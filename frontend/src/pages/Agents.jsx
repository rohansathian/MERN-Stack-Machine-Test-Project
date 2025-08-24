import { useState } from "react";
import axios from "axios";

function Agents() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { username, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setUsername(""); setEmail(""); setPassword(""); setRole("user");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding agent");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <div style={{
        width: 400,
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "#f9f9f9",
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#333" }}>Add Agent</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
                marginTop: 5,
              }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
                marginTop: 5,
              }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
                marginTop: 5,
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Role:</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
                marginTop: 5,
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Agent
          </button>
        </form>
        {message && <p style={{ marginTop: 15, textAlign: "center", color: "#ff3333" }}>{message}</p>}
      </div>
    </div>
  );
}

export default Agents;
