// apiClient.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/"; // backend base url

// --- Helper to get tokens from localStorage ---
function getAccessToken() {
  return localStorage.getItem("access");
}

function getRefreshToken() {
  return localStorage.getItem("refresh");
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// --- Add access token before requests ---
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Refresh token if 401 (unauthorized) ---
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refresh = getRefreshToken();
        if (refresh) {
          const res = await axios.post(`${API_URL}token/refresh/`, { refresh });
          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return apiClient(originalRequest); // retry with new token
        }
      } catch (err) {
        console.error("Token refresh failed", err);
        // optionally clear tokens & redirect to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
