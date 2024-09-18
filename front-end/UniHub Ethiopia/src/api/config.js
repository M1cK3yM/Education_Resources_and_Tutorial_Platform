import axios from "axios";
import { getCookie, requestHandler } from "@/utils/requestHandler";

export const BASE_URL = import.meta.env.VITE_API_URL;

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
      await requestHandler(
        async () => await apiClient.post("/refresh", {
          refreshToken: getCookie("refreshToken"),
        }),
        null,
        (res) => {
          const { accessToken, refreshToken } = res;
          document.cookie = `accessToken=${accessToken}; path=/; max-age=900`;
          document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${15 * 24 * 60 * 60}`;
          return apiClient(originalRequest);
        },
        (error) => {
          console.log("Failed to refresh token", error);
        }
      )
    }
    return Promise.reject(error);
  },
);

export default apiClient;
