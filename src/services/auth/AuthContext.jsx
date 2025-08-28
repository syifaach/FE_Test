// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import httpHandler from "../../utils/http";
import { API } from "../../constants/api";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (username, password) => {
    try {
      const res = await httpHandler.post(API.login, { username, password });
      if (res) {
        const token = res?.data?.token
        localStorage.setItem("token", token);
        setToken(token);
      }

      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
