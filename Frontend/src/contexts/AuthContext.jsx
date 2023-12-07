import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};
