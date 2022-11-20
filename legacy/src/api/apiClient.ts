import axios from "axios";

export const apiClient = axios.create({
  baseURL: String(import.meta.env.VITE_API_BASE_URL),
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
