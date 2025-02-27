import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Example function to trigger backend processing
export const triggerProcessing = async () => {
  try {
    const { data } = await API.post("/process");
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default API;
