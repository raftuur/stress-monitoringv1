import axios from "axios";
import Cookies from "js-cookie";

console.log("API URL =", process.env.NEXT_PUBLIC_API_URL);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;