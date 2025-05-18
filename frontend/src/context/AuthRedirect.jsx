// components/AuthRedirect.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading"; // Corrected import path if needed

const AuthRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  console.log(user);
  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Renders nested route (e.g. login or register)
};

export default AuthRedirect;
