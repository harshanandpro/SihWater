// PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
