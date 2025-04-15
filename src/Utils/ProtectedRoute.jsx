import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./checkTokenExpired";
import { toast } from "react-toastify";
import { LOGIN } from "../Constants/constants";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    toast.error("Token Expired! , redirected to login page.");
    localStorage.removeItem("token");
    return <Navigate to={LOGIN} replace />;
  }
  return children;
};

export default ProtectedRoute;