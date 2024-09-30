import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import PropTypes from "prop-types";
import { requestHandler, getCookie } from "@/utils/requestHandler";
import { Loader } from "rsuite";

const AuthContext = createContext({
  user: null,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  verifyUser: async () => { },
  forgetPassword: async () => { },
  resetPassword: async () => { },
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

  const signinWithGoogle = async () => {
    const res = await requestHandler(
      async () => await authApi.signinWithGoogle(),
      null,
      (res) => {
        console.log(res)
        window.location.href = res.url;
      },
      (error) => console.log(error),
    );

    return res;
  }

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
        isLoading,
        signinWithGoogle,
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
