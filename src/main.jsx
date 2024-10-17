import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { LoadingProvider } from "./common/hooks/use-loading-context.jsx";
import store from "./redux/store.js";
import router from "./routes/routes.jsx";

const theme = createTheme({
  // colorSchemes: {
  //   dark: true,
  // },
  palette: {
    // mode: "dark",
    primary: {
      main: "#0d1f2d", // Azul sólido
      secondary: "#1f3b5a", // Azul oscuro
    },
    secondary: {
      main: "#578e22", // Verde brillante
    },
    terceary: {
      main: "#fce003",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    drawer: {
      selected: "#7bd94b",
      hover: "#508d31",
    },
    action: {
      selected: "#f0f4f8",
      hover: "#e3e8ec",
    },
    chipStatus: {
      Backlog: "rgba(0, 0, 139, 0.5)",
      Doing: "rgba(70, 130, 180, 0.5)",
      Done: "rgba(0, 128, 0, 0.5)",
    },
    statusTask: {
      Backlog: "#0d1f2d",
      Doing: "#1f3b5a",
      Done: "#578e22",
    },
    overTask: {
      main: "#f44336",
    },
    priorityTask: {
      Alta: "#cf940a",
      Urgente: "#b13a41",
      Media: "#0084cb",
      Baja: "#87909e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </LoadingProvider>
    </ThemeProvider>
  </StrictMode>
);
