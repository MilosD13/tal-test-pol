import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRout({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If no token, send the user to /login, preserving where they wanted to go
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Otherwise render the protected UI (AppLayout + nested Routes)
  return children;
}
