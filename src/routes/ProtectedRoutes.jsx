import { useAuth } from "../services/auth/AuthContext";
import Login from "../pages/login";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Login />
}
