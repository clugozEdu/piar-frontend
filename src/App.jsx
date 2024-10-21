import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "./redux/slices/alert-slice";
import AppBarSite from "./common/components/layout/app-bar-site";
import useWebSocket from "./common/hooks/web-socket";
import { useSnackbar } from "notistack";

function App() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [advisorLogin, setAdvisorLogin] = useState([]);
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { showAlert, messageAlert } = useSelector((state) => state.alertWS);

  useWebSocket();

  useEffect(() => {
    setAdvisorLogin([advisor]);
  }, [advisor]);

  useEffect(() => {
    if (showAlert && messageAlert) {
      enqueueSnackbar(messageAlert, {
        variant: "success",
        autoHideDuration: 2500,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      });

      // Limpiar la alerta después de mostrar el snackbar
      dispatch(clearAlert());
    }
  }, [showAlert, messageAlert, enqueueSnackbar, dispatch]);

  return (
    <>
      <CssBaseline />
      {advisorLogin.length > 0 && <AppBarSite advisor={advisorLogin} />}
    </>
  );
}

export default App;
