/*
  Create a new component called ProtectRouter that will be used to protect the routes that require authentication.
  This component will check if the user is authenticated and will redirect them to the login page if they are not.
  If the user is authenticated, it will render the protected route.
*/

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRouter = () => {
  const { is_authenticated } = useSelector((state) => state.loginAdvisor);

  if (!is_authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectRouter;
