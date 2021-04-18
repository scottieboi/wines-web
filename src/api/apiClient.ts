import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
