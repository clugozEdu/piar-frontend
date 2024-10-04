import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store.js";
import router from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the RouterProvider with the Provider */}
    <Provider store={store}>
      {/* Pass the router to the RouterProvider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
