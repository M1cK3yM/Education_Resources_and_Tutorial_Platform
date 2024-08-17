import axios from "axios";
import { getCookie } from "@/utils/requestHandler";

export const BASE_URL = "http://localhost:3000/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie("accessToken"),
  },
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await apiClient.get("/refresh");
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Failed to refresh token", err);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
