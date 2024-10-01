import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import PropTypes from "prop-types";
import { requestHandler, getCookie } from "../utils/requestHandler";
import { Loader } from "rsuite";

const AuthContext = createContext({
  user: null,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  getUser: async () => { },
  isAuthenticated: () => false,
  isLoading: true,
  setUser: () => { }
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const accessToken = getCookie("accessToken");

  const navigate = useNavigate();

  const login = async (data) => {
    const res = await requestHandler(
      async () => await authApi.loginUser(data),
      null,
      (res) => {
        const { data, accessToken, refreshToken } = res;
        setUser(data);
        document.cookie = `accessToken=${accessToken}; path=/; max-age=900`;
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${15 * 24 * 60 * 60}`;// max-age 15day
        navigate("/");
      },
      (error) => console.log(error),
    );


    return res;
  };

  const register = async (data) => {
    const res = await requestHandler(
      async () => await authApi.registerUser(data),
      null,
      () => navigate("/verify"),
      (error) => console.log(error),
    );

    return res;
  };

  const logout = async () => {
    await requestHandler(
      async () => await authApi.logoutUser({ refreshToken: getCookie("refreshToken") }),
      setIsLoading,
      () => {
        setUser(null);
        document.cookie = "accessToken=; max-age=0; path=/;";
        document.cookie = "refreshToken=; max-age=0; path=/;";
      },
      (error) => console.log(error),
    );
  };

  const isAuthenticated = () => !!user;

  const getUser = async () => {
    if (user === null) {
      await requestHandler(
        async () => await authApi.getUserData(),
        setIsLoading,
        (res) => {
          console.log(res);
          setUser(res);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (user === null) {
        await requestHandler(
          async () => await authApi.getUserData(),
          setIsLoading,
          (res) => {
            console.log(res);
            setUser(res);
          },
          (error) => {
            console.log(error);
          },
        );
      }
    };

    getUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        getUser,
        isLoading,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, AuthProvider, AuthContext };
