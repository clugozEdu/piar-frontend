import { createBrowserRouter, Navigate } from "react-router-dom";
import SingIn from "../feactures/auth/forms/login.jsx";
import HomePage from "../feactures/home/home.jsx";
import ProtectRouter from "./protect-router.jsx";
import TravelInit from "../feactures/travel/travel-init.jsx";
import ErrorPage from "./error-page.jsx";
import App from "../App.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SingIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ProtectRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Navigate to="/home" replace />,
          },
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/travek/create",
            element: <TravelInit />,
          },
        ],
      },
    ],
  },
]);

export default router;
