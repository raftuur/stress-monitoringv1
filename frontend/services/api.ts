import axios from "axios";
import Cookies from "js-cookie";

console.log("NEXT_PUBLIC_API_URL =", process.env.NEXT_PUBLIC_API_URL);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log("BASE URL =", api.defaults.baseURL);

api.interceptors.request.use((config) => {
  console.log("REQUEST URL:", config.baseURL, config.url);

  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;