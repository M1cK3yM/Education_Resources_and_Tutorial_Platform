import apiClient from "./config";

const getUserData = () => {
  return apiClient.get("/api/users");
};

const loginUser = (data) => {
  return apiClient.post("/admin/login", data);
};

const registerUser = (data) => {
  return apiClient.post("/register", data);
};

const logoutUser = (data) => {
  return apiClient.post("/admin/logout", data);
};

export {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
};
