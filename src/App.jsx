import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import SnackbarMessage from "./common/components/ui/snackbar";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "./redux/slices/alert-slice";
import AppBarSite from "./common/components/layout/app-bar-site";
import useWebSocket from "./common/hooks/web-socket";

/** Component App
 * Render the AppBarSite component
 * @return {component}
 */

function App() {
  /** Init state the component */
  const dispatch = useDispatch();
  const [advisorLogin, setAdvisorLogin] = useState([]);
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { showAlert, messageAlert } = useSelector((state) => state.alertWS);

  useWebSocket();

  /** UseEffect to set the advisor login */
  useEffect(() => {
    setAdvisorLogin([advisor]);
  }, [advisor]);

  console.log(messageAlert);

  return (
    <>
      {/* Mostrar el Snackbar global */}
      {showAlert && (
        <SnackbarMessage
          open={showAlert}
          message={
            messageAlert.event === "task_created"
              ? "Tarea creada con éxito"
              : messageAlert.event === "task_deleted"
              ? "Tarea eliminada con éxito"
              : messageAlert.event === "task_updated"
              ? "Tarea actualizada con éxito"
              : messageAlert.event === "spacing_updated"
              ? "Espacio actualizado con éxito"
              : messageAlert.event === "spacing_deleted"
              ? "Espacio eliminado con éxito"
              : messageAlert.event === "spacing_created"
              ? "Espacio creado con éxito"
              : messageAlert.event === "list_updated"
              ? "Lista actualizada con éxito"
              : messageAlert.event === "list_deleted"
              ? "Lista eliminada con éxito"
              : messageAlert.event === "list_created"
              ? "Lista creada con éxito"
              : ""
          }
          onCloseHandler={() => {
            dispatch(clearAlert());
          }}
          duration={3000}
          severity="success"
          vertical="bottom"
          horizontal="right"
        />
      )}
      {/* Init Layout */}
      <CssBaseline />
      {advisorLogin.length > 0 && <AppBarSite advisor={advisorLogin} />}
    </>
  );
}

export default App;
