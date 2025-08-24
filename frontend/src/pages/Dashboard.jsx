import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // redirect to login if no token
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Unauthorized or session expired");
        localStorage.removeItem("token");
        navigate("/"); // redirect to login
      }
    };

    fetchProtected();
  }, [navigate]);

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
