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
    statusTask: {
      Backlog: "#0d1f2d",
      Doing: "#1f3b5a",
      Done: "#578e22",
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
      {/* Wrap the RouterProvider with the Provider */}
      <LoadingProvider>
        <Provider store={store}>
          {/* Pass the router to the RouterProvider */}
          <RouterProvider router={router} />
        </Provider>
      </LoadingProvider>
    </ThemeProvider>
  </StrictMode>
);
