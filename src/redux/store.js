import { configureStore } from "@reduxjs/toolkit";
import advisorLoginSlice from "../feactures/auth/redux/login-slice";
import advisorsSlice from "./slices/advisors-slice";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    loginAdvisor: advisorLoginSlice,
    advisors: advisorsSlice,
  },
});

export default store;
