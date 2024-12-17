import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = ["superadmin"] }) => {
  // Get the user from Redux store
  const user = useSelector((state) => state.user);
  console.log("ProtectedRoute -> user", user);
  // Check if user exists and is a superadmin (using is_staff)
  const isAllowed = user && user.is_staff;

  if (!user) {
    // Redirect to login if no user is logged in
    return <Navigate to="/" replace />;
  }

  if (!isAllowed) {
    // Redirect to home or unauthorized page if not a superadmin
    return <Navigate to="/" replace />;
  }

  // Render the child routes if authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
