import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthDialogContext = createContext({
  isLoginOpen: false,
  isSignupOpen: false,
  toggleLogin: () => {},
  toggleSignup: () => {},
});

export const useAuthDialog = () => useContext(AuthDialogContext);

export const AuthDialogProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  return (
    <AuthDialogContext.Provider
      value={{ isLoginOpen, isSignupOpen, toggleLogin, toggleSignup }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};

AuthDialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
