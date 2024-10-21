import store from "@/redux/store";
import { logout } from "@/feactures/auth/redux/login-slice";
import Swal from "sweetalert2";

/** Component to token authenticated validate in Api request
 * @param {object} error - Error object
 */

const tokenRefresh = (error) => {
  if (error.status === 401 && error.response.statusText === "Unauthorized") {
    localStorage.removeItem("token-advisor");
    localStorage.removeItem("is_authenticated");
    localStorage.removeItem("advisor");

    Swal.fire({
      title: "Sesión Expirada",
      text: "Por favor inicie sesión nuevamente",
      icon: "warning",
      confirmButtonColor: "#1f3b5a",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        store.dispatch(logout());
      }
    });
  }
};

export default tokenRefresh;
