import axios from "axios";
import { getCookie } from "@/utils/requestHandler";

export const BASE_URL = "http://localhost:3000/";

let trial = false;

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
    console.log(trial);

    if (error.response.status === 401 && !trial) {
      trial = true;
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
