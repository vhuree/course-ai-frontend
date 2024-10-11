import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import PropTypes from "prop-types";

export const RequireAuth = ({ children }) => {
  RequireAuth.propTypes = {
    children: PropTypes.any,
  };
  const location = useLocation();
  const auth = useAuth();
  if (!auth.user)
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  return children;
};
