import axios from "axios";

export const BASE_URL = "http://localhost:3000/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export default apiClient;
