import { createBrowserRouter, Navigate } from "react-router-dom";
import SingIn from "../feactures/auth/forms/login.jsx";
import HomePage from "../feactures/home/home.jsx";
import TaskPage from "@/feactures/clickFZT/task/task-page.jsx";
import ProtectRouter from "./protect-router.jsx";
// import TravelInit from "../feactures/travel/travel-init.jsx";
import ErrorPage from "./error-page.jsx";
import App from "../App.jsx";

/** Router to app using createBrowserRouter from react-router-dom
 * @return {component}
 */
const router = createBrowserRouter([
  /** login route */
  {
    path: "/login",
    element: <SingIn />,
    errorElement: <ErrorPage />,
  },
  /** root route */
  {
    path: "/",
    /** Component ProtectRouter
     * This component validate the user login
     * @return {component}
     */
    element: <ProtectRouter />,
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
            path: "home",
            element: <Navigate to="/home/inicio" replace />,
          },
          {
            path: "home/inicio",
            element: <HomePage />,
          },
          {
            path: "clickFZT",
            element: <Navigate to="/clickFZT/inicio" replace />,
          },
          {
            path: "clickFZT/inicio",
            element: <HomePage />,
          },
          {
            path: "clickFZT/spacing/:spacingId/",
            element: <HomePage />,
          },
          {
            path: "clickFZT/spacing/:spacingId/list/:listId",
            element: <TaskPage />,
          },
          {
            path: "schools",
            element: <Navigate to="/schools/inicio" replace />,
          },
          {
            path: "schools/inicio",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
