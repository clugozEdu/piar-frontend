import { configureStore } from "@reduxjs/toolkit";
import advisorLoginSlice from "../feactures/auth/redux/login-slice";
import advisorsSlice from "./slices/advisors-slice";
import spacesSlice from "./slices/clickFZT/spaces-slices";
import statusSlice from "./slices/clickFZT/status-slice";
import prioritySlice from "./slices/clickFZT/priority-slice";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    loginAdvisor: advisorLoginSlice,
    advisors: advisorsSlice,
    spaces: spacesSlice,
    statusTask: statusSlice,
    priorityTask: prioritySlice,
  },
});

export default store;
