// src/utils/http.js
import axios from "axios";

const httpHandler = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

httpHandler.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpHandler.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (err.response?.status === 400) {
      alert("Bad Request");
      console.error("Bad Request", err);
    } else if (err.response?.status === 404) {
      alert('URL Not Found')
      console.error("URL Not Found", err);
    } else if (err.response?.status === 500) {
      alert("Internal Server Error");
      console.error("Internal Server Error", err);
    }
    return Promise.reject(err);
  }
);

export default httpHandler;
