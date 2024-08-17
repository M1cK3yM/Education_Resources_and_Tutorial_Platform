import apiClient from "./config";

const getUserData = () => {
  return apiClient.get("/api/users");
};

const loginUser = (data) => {
  return apiClient.post("/login", data);
};

const registerUser = (data) => {
  return apiClient.post("/register", data);
};

const logoutUser = () => {
  return apiClient.get("/logout");
};

export { getUserData, loginUser, logoutUser, registerUser };
