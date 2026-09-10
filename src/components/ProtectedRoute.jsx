import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, isLoggedIn } = useAuth();

  // User is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // A specific role is required
  if (role && user?.role !== role) {
    // Coordinator trying to access volunteer page
    if (user?.role === "coordinator") {
      return <Navigate to="/coordinator/dashboard" replace />;
    }

    // Volunteer trying to access coordinator page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
