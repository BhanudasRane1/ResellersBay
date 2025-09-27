import axios from "axios";
const API_URL = "http://localhost:8000/api/"; // Adjust the port if your backend runs on a different one

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

export default apiClient;
