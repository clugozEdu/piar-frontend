import store from "@/redux/store";
import { logout } from "@/feactures/auth/redux/login-slice";

/** Component to token authenticated validate in Api request
 * @param {object} error - Error object
 */

const tokenRefresh = (error) => {
  if (error.status === 401 && error.response.statusText === "Unauthorized") {
    localStorage.removeItem("token-advisor");
    localStorage.removeItem("is_authenticated");
    localStorage.removeItem("advisor");

    store.dispatch(logout());
  }
};

export default tokenRefresh;
