// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://cinesphere-movie-ticket-booking-backend.onrender.com/", // your backend URL
});

// Add a request interceptor to include JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
