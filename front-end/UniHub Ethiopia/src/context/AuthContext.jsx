import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import PropTypes from "prop-types";

const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAuthenticated: () => false,
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const a = await authApi.loginUser(data);
    console.log(a);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {isLoading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, AuthProvider, AuthContext };
