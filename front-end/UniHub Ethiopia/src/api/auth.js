import apiClient from "./config";

const getUserData = () => {
  return apiClient.get("/api/user");
};

const loginUser = (data) => {
  return apiClient.post("/login", data);
};

export { getUserData, loginUser };
