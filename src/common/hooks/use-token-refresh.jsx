import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/feactures/auth/redux/login-slice";
import PropTypes from "prop-types";

/** Component to token authenticated validate in Api request
 * @param {object} error - Error object
 */
const TokenRefresh = ({ error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && error.response && error.response.status === 401) {
      console.log("Token expired");
      dispatch(logout());
    }
  }, [error, dispatch]);
};

/** PropTypes
 * @param {object} error - Error object
 */
TokenRefresh.propTypes = {
  error: PropTypes.object,
};

export default TokenRefresh;
