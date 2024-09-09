import apiClient from "./config";
import { getCookie } from "@/utils/requestHandler";

const getUserById = (id) => {
  return apiClient.get("/api/users/" + id);
};

const uploadProfile = (data, id) => {
  return apiClient.put("/api/users/" + id, data, {
    headers: {
      Authorization: "Bearer " + getCookie("accessToken"),
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  });
};

const updatePassword = (data, id) => {
  return apiClient.post("/api/users/password/" + id, data);
};

export { getUserById, uploadProfile, updatePassword };
