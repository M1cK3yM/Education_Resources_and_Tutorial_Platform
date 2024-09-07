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
  verifyUser: async () => {},
  forgetPassword: async () => {},
  resetPassword: async () => {},
  getUser: async () => {},
  isAuthenticated: () => false,
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const accessToken = getCookie("accessToken");

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
    const res = await requestHandler(
      async () => await authApi.registerUser(data),
      setIsLoading,
      () => navigate("/verify"),
      (error) => console.log(error),
    );

    return res;
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

  const verifyUser = async (token) => {
    await requestHandler(
      async () => await authApi.verifyUser(token),
      setIsLoading,
      () => {
        setTimeout(() => navigate("/"), 3000);
      },
      (error) => {
        console.log(error);
        navigate("*");
      },
    );
  };

  const forgetPassword = async (data) => {
    await requestHandler(
      async () => await authApi.forgetPassword(data),
      setIsLoading,
      () => {
        navigate("reset-password");
      },
      (error) => console.log(error),
    );
  };

  const resetPassword = async (token, data) => {
    const res = await requestHandler(
      async () => authApi.resetPassword(token, data),
      setIsLoading,
      () => {
        navigate("/");
      },
      (error) => console.log(error),
    );

    return res;
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
        verifyUser,
        forgetPassword,
        resetPassword,
        getUser,
      }}
    >
      {isLoading ? <Loader size="md" center /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, AuthProvider, AuthContext };
