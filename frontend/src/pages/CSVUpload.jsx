import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CSVUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // 1️⃣ Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must login first!");
      navigate("/"); // redirect to login
      return;
    }

    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/upload-csv",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      // Handle token errors or upload errors
      if (err.response?.status === 401 || err.response?.status === 403) {
        setMessage("Token invalid or expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/"); // redirect to login
      } else {
        setMessage(err.response?.data?.message || "Upload failed");
      }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <h2>Upload CSV</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CSVUpload;
