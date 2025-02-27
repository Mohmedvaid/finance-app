import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch directory structure
  const fetchDirectory = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/files/structure`
      );
      setDirectory(response.data.structure);
    } catch (err) {
      setError("Failed to fetch directory structure.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  // Function to download a file
  const downloadFile = async (filePath) => {
    if (!filePath) {
      alert("Invalid file path.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/files/download`,
        {
          params: { path: filePath },
          responseType: "blob", // Ensures correct file download
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filePath.split("/").pop()); // Extract filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Failed to download file.");
    }
  };

  // Recursive function to render folder structure
  const renderDirectory = (items) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            style={{ marginLeft: item.type === "directory" ? "20px" : "40px" }}
          >
            {item.type === "directory" ? "📁" : "📄"}
            {item.type === "file" ? (
              <span
                onClick={() => downloadFile(item.path)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {item.name}
              </span>
            ) : (
              item.name
            )}
            {item.children && <div>{renderDirectory(item.children)}</div>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>File Directory Structure</h1>
      <button onClick={fetchDirectory} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {directory ? (
        <div style={{ marginTop: "20px" }}>{renderDirectory(directory)}</div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>No directory data available.</p>
      )}
    </div>
  );
};

export default Home;
