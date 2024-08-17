import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import PropTypes from "prop-types";
import { requestHandler, getCookie } from "@/utils/requestHandler";
import { Loader } from "rsuite";

const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAuthenticated: () => false,
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const accessToken = getCookie("access_token");

  const navigate = useNavigate();

  const login = async (data) => {
    await requestHandler(
      async () => await authApi.loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        setUser(data);
        navigate("/");
      },
      (error) => console.log(error),
    );
  };

  const register = async (data) => {
    await requestHandler(
      async () => await authApi.registerUser(data),
      setIsLoading,
      () => console.log("verify your email"),
      (error) => console.log(error),
    );
  };

  const logout = async () => {
    await requestHandler(
      async () => await authApi.logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        navigate("/");
      },
      (error) => console.log(error),
    );
  };

  const isAuthenticated = () => !!user;

  useEffect(() => {
    const getUser = async () => {
      await requestHandler(
        async () => await authApi.getUserData(),
        setIsLoading,
        (res) => {
          console.log(res);
          setUser(res);
        },
        (error) => console.log(error),
      );
    };
    if (user === null) getUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {isLoading ? <Loader size="md" center /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, AuthProvider, AuthContext };
