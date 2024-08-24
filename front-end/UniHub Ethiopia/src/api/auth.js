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

const verifyUser = (token) => {
  return apiClient.get("/verify-email/" + token);
};

const forgetPassword = (data) => {
  return apiClient.post("/forget-password", data);
};

const resetPassword = (token, data) => {
  return apiClient.post("/reset-password" + token, data);
};

export {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
  forgetPassword,
  resetPassword,
};
