// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
