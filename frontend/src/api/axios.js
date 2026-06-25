import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
  if (window.location.pathname.startsWith("/admin")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  }
    return Promise.reject(err);
  }
);

export default api;