import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    if (user?.role === "coordinator") {
      return <Navigate to="/coordinator/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default ProtectedRoute;
