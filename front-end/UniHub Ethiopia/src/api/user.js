import apiClient from "./config";

const getUserById = (id) => {
  return apiClient.get("/api/users/" + id);
};

const uploadProfile = (data, id) => {
  return apiClient.put("/api/users/" + id, data, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  });
};

export { getUserById, uploadProfile };
